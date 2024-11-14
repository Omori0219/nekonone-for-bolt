import { defineEventHandler } from 'h3'
import Stripe from 'stripe'

if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
  throw new Error('Stripeの環境変数がセットされていません')
}

// Stripeの初期化
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
})

export default defineEventHandler(async (event) => {
  const { subscriptionId } = await readBody(event)

  // サブスクリプションIDの存在を確認
  if (!subscriptionId) {
    return {
      status: 400,
      body: {
        message: 'サブスクリプションIDが必要です',
      },
    }
  }

  try {
    // サブスクリプションをキャンセル
    const canceledSubscription = await stripe.subscriptions.update(
      subscriptionId,
      {
        cancel_at_period_end: true,
      }
    )
    return {
      status: 200,
      body: {
        message: 'サブスクリプションが解約されました',
        subscription: canceledSubscription,
      },
    }
  } catch (error) {
    console.error('サブスクリプションの解約に失敗しました:', error) // eslint-disable-line no-console

    return {
      status: 500,
      body: {
        message: 'サブスクリプションの解約に失敗しました',
      },
    }
  }
})
