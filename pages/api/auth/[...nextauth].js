// // const NextAuth = require('next-auth')
import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
// import { handleAuth } from '@auth0/nextjs-auth0';


// export default handleAuth();

export default (req, res) =>
  NextAuth(req, res, {
    // Configure one or more authentication providers
    providers: [
      Providers.Google({
        clientId: process.env.GOOGLE_CLIENT_ID,
        // '588072545137-3lgmqsa10s4srpf4fdfuf4s5opm2b6sp.apps.googleusercontent.com',
        clientSecret: process.env.GOOGLE_SECRET_KEY,
        // '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',
      }),
      Providers.Facebook({
        clientId: process.env.FACEBOOK_CLIENT_ID,
        // '531948417873089',
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET_KEY,
        // '1c92b15bc4ae14151666d895b4c356a3',
      }),

      // ...add more providers here
      Providers.Email({
        server: {
          host: process.env.SENDGRID_HOST,
          port: process.env.SENDGRID_PORT,
          auth: {
            user: process.env.SENDGRID_USERNAME,
            pass: process.env.SENDGRID_PASSWORD,
          },
        },
        from: process.env.SENDGRID_EMAIL_FROM,
      }),
    ],
    secret: process.env.NEXTAUTH_SECRET_KEY,
    database: process.env.CONNECTION_URI,
    // jwt: {
    //   secret: process.env.JWT_SECRET,
    // },
    pages: {
      signIn: '/signIn',
    },
    theme: 'dark',
    //     callbacks: {
    //       async signIn(user, account, profile) {
    //         console.log(user,account,profile)
    //       return true
    //     },
    //     async redirect(url, baseUrl) {
    //       return baseUrl
    //     },
    //     async session(session, user) {
    //       return session
    //     },
    //     async jwt(token, user, account, profile, isNewUser) {
    //       return token
    //     }
    // }
  });

