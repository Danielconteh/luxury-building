import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
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
    jwt: {
      secret: process.env.JWT_SECRET,
    },
    pages: {
      signIn: '/signIn',
    },   
    

  });

