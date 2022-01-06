import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

const { v4: uuidv4 } = require('uuid');




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
    session: {
      // Use JSON Web Tokens for session instead of database sessions.
      // This option can be used with or without a database for users/accounts.
      // Note: `strategy` should be set to 'jwt' if no database is used.
      strategy: 'jwt',

      // Seconds - How long until an idle session expires and is no longer valid.
      // maxAge: 30 * 24 * 60 * 60, // 30 days

      // Seconds - Throttle how frequently to write to database to extend a session.
      // Use it to limit write operations. Set to 0 to always update the database.
      // Note: This option is ignored if using JSON Web Tokens
      // updateAge: 24 * 60 * 60, // 24 hours
    },

    pages: {
      signIn: '/signIn',
    },
    callbacks: {
      async redirect({ url, baseUrl }) {
        return baseUrl;
      },

     
    },
  });




//   callbacks: {
//     jwt: async (token, user, account, profile, isNewUser) => {
//         //  "user" parameter is the object received from "authorize"
//         //  "token" is being send below to "session" callback...
//         //  ...so we set "user" param of "token" to object from "authorize"...
//         //  ...and return it...
//         user && (token.user = user);
//         return Promise.resolve(token)   // ...here
//     },
//     session: async (session, user, sessionToken) => {
//         //  "session" is current session object
//         //  below we set "user" param of "session" to value received from "jwt" callback
//         session.user = user.user;
//         return Promise.resolve(session)
//     }
// }