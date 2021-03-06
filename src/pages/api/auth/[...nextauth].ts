import NextAuth, { type NextAuthOptions } from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { prisma } from '../../../server/db/client'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? ''
    })
  ],
  callbacks: {
    session: async ({ session, user }) => {
      if (user.id && session?.user) {
        session.user.id = user.id
      }

      return session
    }
  },
  pages: {
    verifyRequest: '/auth/verify-request'
  }
}

export default NextAuth(authOptions)
