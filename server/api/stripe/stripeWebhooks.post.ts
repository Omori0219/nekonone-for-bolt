import { defineEventHandler } from 'h3'
import { Stripe } from 'stripe'
import { getContainer } from '../../utils/cosmosClient'

if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
  throw new Error('Stripeの環境変数がセットされていません')
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
})
const getSubscriptionStatus = async (subscriptionId: string) => {
  const subscription = await stripe.subscriptions.retrieve(subscriptionId)
  return subscription.status
}

export default defineEventHandler(async (event) => {
  const sig = event.req.headers['stripe-signature']

  if (!sig) {
    return createError({
      statusCode: 400,
      message: 'Stripe signature missing in the request',
    })
  }
  let stripeEvent: Stripe.Event
  try {
    if (!process.env.STRIPE_WEBHOOK_SECRET) {
      throw new Error('Stripe webhook secret is not set')
    }
    const rawBody = await readRawBody(event)
    if (!rawBody) {
      throw new Error('Failed to read raw request body')
    }
    stripeEvent = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    )
  } catch (err) {
    if (err instanceof Stripe.errors.StripeSignatureVerificationError) {
      return createError({
        statusCode: 400,
        message: 'Webhook Error: Failed to verify Stripe signature',
      })
    } else if (err instanceof SyntaxError) {
      return createError({
        statusCode: 400,
        message: 'Webhook Error: Failed to parse the request body',
      })
    } else {
      return createError({
        statusCode: 400,
        message: `Webhook Error: ${err instanceof Error ? err.message : 'Unknown error'}`,
      })
    }
  }

  // イベントの種類に応じて処理を分岐
  // チェックアウトセッションが完了した場合(決済完了時)
  if (stripeEvent.type === 'checkout.session.completed') {
    const session = stripeEvent.data.object as Stripe.Checkout.Session
    // 入力検証
    if (!session.metadata || !session.subscription) {
      console.error('Invalid session metadata or subscription ID:', session) // eslint-disable-line no-console
      return createError({
        statusCode: 400,
        message: 'Invalid session metadata or subscription ID',
      })
    }

    const userId = session.metadata.userId
    const subscriptionId = session.subscription
    const subscriptionAmount = session.metadata.price // 金額を取得
    const subscriptionStart = new Date().toISOString() // 現在の日時を取得
    try {
      const container = getContainer('users')
      const { resource: user } = await container.item(userId, userId).read()
      if (!user) {
        return createError({
          statusCode: 404,
          message: 'User not found',
        })
      }
      // サブスクリプションステータスを取得
      const subscriptionStatus = await getSubscriptionStatus(
        subscriptionId as string
      )
      // サブスクリプション情報を更新
      user.subscription = {
        id: subscriptionId,
        status: subscriptionStatus,
        amount: subscriptionAmount,
        createdAt: subscriptionStart,
        updatedAt: subscriptionStart,
        cancelAtPeriodEnd: false,
      }
      user.isSubscribed = true
      await container.items.upsert(user)
      console.log('データベースにサブスクリプション情報を更新しました') // eslint-disable-line no-console
    } catch (dbError) {
      return createError({
        statusCode: 500,
        message: `Database operation failed: ${dbError instanceof Error ? dbError.message : 'Unknown error'}`,
      })
    }
  }

  // サブスクリプションがキャンセルされた場合
  if (stripeEvent.type === 'customer.subscription.deleted') {
    const subscription = stripeEvent.data.object as Stripe.Subscription
    const userId = subscription.metadata.userId

    try {
      const container = getContainer('users')
      const { resource: user } = await container.item(userId, userId).read()
      if (!user) {
        return createError({
          statusCode: 404,
          message: 'User not found',
        })
      }
      // サブスクリプション情報を更新
      user.subscription = {}
      user.isSubscribed = false
      await container.items.upsert(user)
      console.log('データベースにサブスクリプション情報を更新しました') // eslint-disable-line no-console
    } catch (dbError) {
      return createError({
        statusCode: 500,
        message: `Database operation failed: ${dbError instanceof Error ? dbError.message : 'Unknown error'}`,
      })
    }
  }
  return { received: true }
})
