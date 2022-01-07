import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import { connect1, User } from '../../../mongodConnection/connection';
import Adapters from 'next-auth/adapters';

const { v4: uuidv4 } = require('uuid');


export default (req, res) =>
  NextAuth(req, res, {
    // Configure one or more authentication providers

    providers: [
      Providers.Google({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_SECRET_KEY,
        // profile(profile) {
        //   profile && (profile.pin = '123')
        //   return profile
        // },
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
    session: {
      jwt: true,
      maxAge: 30 * 24 * 60 * 60,
    },
    // jwt: {
    //   secret: process.env.NEXTAUTH_SECRET_KEY,
    //   encryption: true,
    // },
    callbacks: {
      async redirect({ url, baseUrl }) {
        return baseUrl;
      },
      async jwt(token, user, account, profile, isNewUser) {
        const data = await User.findById(token.sub);
        token && (token.pin = data.pin);
        return token
      },
    },
    events: {
      async createUser(message) {
        let data = await User.findById(message.id);
        data.pin = uuidv4();
        await data.save();
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