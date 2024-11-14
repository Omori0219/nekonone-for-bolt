import { User as CustomUser } from './user'

declare module 'next-auth' {
  interface User extends CustomUser {
    name?: string | null
    email?: string | null
    image?: string | null
  }
}
