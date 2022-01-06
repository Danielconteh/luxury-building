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
      async session({ session, user, token }) {
        session.Id = user.ID;
        return session;
      },
      async jwt({ token, user, account, profile, isNewUser }) {
        console.log('JWT ==================');
        if (user) {
          user.ID = uuidv4();
        }
        return token;
      },
    },
  });

