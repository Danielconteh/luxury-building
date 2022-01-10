import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import { connect1, User } from '../../../mongodConnection/connection';

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
        // clientId: 'bf984fb2b602fecf7950', TESTING PURPOSE ONLY!!
        // clientSecret: '32d27907b2fec2b72bbfea101384c3d910aa9994',
      }),
    ],
    database: process.env.CONNECTION_URI,

    secret: process.env.NEXTAUTH_SECRET_KEY,
    pages: {
      signIn: '/auth/signIn',
    },
    session: {
      jwt: true,
      maxAge: 30 * 24 * 60 * 60,
    },
    // jwt: {
    //   secret: process.env.NEXTAUTH_SECRET_KEY,
    //   encryption: true,
    // },

    events: {
      async createUser(message) {
        const usersCollection = connect1.collection('users');
        usersCollection.updateOne(
          { _id: message.id },
          {
            $set: {
              pin: uuidv4(),
            },
          }
        ); 
      },
    },

    callbacks: {
      async redirect({ url, baseUrl }) {
        return baseUrl;
      },
      async jwt(token, user, account, profile, isNewUser) {
        const data = await User.findById(token.sub);
        
        token && (token.pin = data.pin)
        return token;
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