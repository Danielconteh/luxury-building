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
    jwt: {
      secret: process.env.NEXTAUTH_JWT_KEY,
    },
    session: {
      jwt: true,
      maxAge: 30 * 24 * 60 * 1000,
      updateAge: 30 * 24 * 60 * 1000,
    },

    events: {
      async createUser(message) {
        const usersCollection = connect1.collection('users');
        usersCollection.updateOne(
          { _id: message.id },
          {
            $set: {
              pin: `${
                uuidv4() + Date.now() + Math.random() * Date.now()
              }`,
            },
          }
        );
      },
    },

    callbacks: {
      async redirect({ url, baseUrl }) {
        return baseUrl;
      },
      async signIn(user, account) {
        return { user, account };
      },
      async jwt(token, user, account) {
        const data = await User.findById(token.sub);

        token && (token.pin = data.pin);

        // [very uses!] Persist the OAuth access_token to the token right after signin
        if (account) {
          token.accessToken = account.access_token;
          console.log(token.accessToken);
        }
        return token;
      },
      async session(session, token, user) {
        // Send properties to the client, like an access_token from a provider.
        // console.log(session, token, user);
        session.accessToken = token.accessToken;
        return session;
      },
    },
  });

