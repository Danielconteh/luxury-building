import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

import uniqid from 'uniqid';




export default (req, res) =>
  NextAuth(req, res, {
    // Configure one or more authentication providers

    providers: [
      Providers.Google({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_SECRET_KEY,
      }),

      Providers.GitHub({
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
      }),
    ],
    database: process.env.CONNECTION_URI,
    secret: process.env.NEXTAUTH_SECRET_KEY,
    pages: {
      signIn: '/signIn',
    },   
    callbacks: {
      async signIn({ user, account, profile, email, credentials }) {
      return true
    },
    async redirect({ url, baseUrl }) {
      return baseUrl
    },
      async session({ session, user, token }) {
       user.pin = uniqid(`${user.name}-`);
      return session
    },
      async jwt({ token, user, account, profile, isNewUser }) {
        user.pin = uniqid(`${user.name}-`)
        return token
    }
}

  });

