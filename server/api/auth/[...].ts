import GoogleProvider from 'next-auth/providers/google'
import { NuxtAuthHandler } from '#auth'
export default NuxtAuthHandler({
  secret: process.env.AUTH_SECRET, // 環境変数から秘密鍵を読み込む
  providers: [
    // @ts-expect-error こういうふうにサイトに書いてた
    GoogleProvider.default({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    session({ session }) {
      return session
    },
  },
})
