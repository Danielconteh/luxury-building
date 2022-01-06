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
    pages: {
      signIn: '/signIn',
    },
    callbacks: {
      async redirect({ url, baseUrl }) {
        return baseUrl;
      },

      jwt: async (token, user, account, profile, isNewUser) => {
        //  "user" parameter is the object received from "authorize"
        //  "token" is being send below to "session" callback...
        //  ...so we set "user" param of "token" to object from "authorize"...
        //  ...and return it...
        if (user && isNewUser) { 
          token.user = user
          token.ID = uuidv4();
        } else if(user) {
          token.user = user;
        }
        return Promise.resolve(token); // ...here
      },

      session: async (session, user, sessionToken) => {
        //  "session" is current session object
        //  below we set "user" param of "session" to value received from "jwt" callback
        session.user = user.user;
        session.ID = user.ID;

        return Promise.resolve(session);
      },
    },
  });

