import { defineEventHandler } from 'h3'
import Stripe from 'stripe'

if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
  throw new Error('Stripeの環境変数がセットされていません')
}

// Stripeの初期化
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
})

// APIハンドラの定義
export default defineEventHandler(async (event) => {
  try {
    const { userId, price } = await readBody(event)
    const amount = price._value
    // Create a new Product
    const productObject = await stripe.products.create({
      name: 'ねこのねスポンサープラン',
    })

    // Create a new Price object based on the amount the user entered
    const priceObject = await stripe.prices.create({
      unit_amount: amount,
      currency: 'jpy',
      recurring: { interval: 'month' },
      product: productObject.id,
    })
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price: priceObject.id,
            quantity: 1,
          },
        ],
        mode: 'subscription',
        success_url: `${event.req.headers.origin}/sponsors/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${event.req.headers.origin}/sponsors/cancel`,
        metadata: {
          userId,
          priceId: priceObject.id,
        },
      })
      return { sessionId: session.id }
    } catch (error) {
      console.error('Stripe session creation failed:', error) // eslint-disable-line no-console
      if (error instanceof Error) {
        return createError({ statusCode: 500, message: error.message })
      } else {
        return createError({
          statusCode: 500,
          message: 'An unknown error occurred',
        })
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      return createError({ statusCode: 500, message: error.message })
    } else {
      return createError({
        statusCode: 500,
        message: 'An unknown error occurred',
      })
    }
  }
})
