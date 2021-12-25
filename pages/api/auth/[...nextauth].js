// // const NextAuth = require('next-auth')
import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
// import Auth0Provider from 'next-auth/providers/auth0';
// import { handleAuth } from '@auth0/nextjs-auth0';


// export default handleAuth();

export default (req, res) =>
  NextAuth(req, res, {
    // Configure one or more authentication providers

    providers: [
      Providers.Google({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_SECRET_KEY,
      }),

      Providers.GitHub({
        // clientId: 'a3b23d5d506b9518e2b5',
        // clientSecret: '99e5e634597929f8a38e7cdaf02ce766366b3de2',
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
      }),

      Providers.Auth0({
        // clientId: '7mhERQ9aMzIZi8lXvvq6bd7o1s0KzAAJ',
        // clientSecret:
        //   'QsVl-rYhWvIETNNI8yDuMCYgMYffWvEsMyNZhG7Inq3j27bLcu7ZEo5HIbrtH9SD',
        // domain: 'dev-0hcjgj7v.us.auth0.com',
        // issuer: 'https://dev-0hcjgj7v.us.auth0.com',
        clientId: process.env.AUTH0_CLIENT_ID,
        clientSecret: process.env.AUTH0_CLIENT_SECRET,
        domain: process.env.AUTH0_DOMAIN,
        issuer: process.env.AUTH0_ISSUER_BASE_URL,
      }),
    ],
    secret: process.env.NEXTAUTH_SECRET_KEY,
    database: process.env.CONNECTION_URI,
    jwt: {
      secret: process.env.JWT_SECRET,
    },
    pages: {
      signIn: '/signIn',
    },
    theme: 'dark',
    callbacks: {
      async signIn(profile, account, user, email, credentials) {
        // console.log(profile, user);
        return true;
      },
      async redirect(url, baseUrl) {
        return baseUrl;
      },
      async session(session, user) {
        return session;
      },
      async jwt(token, user, account, profile, isNewUser) {
        return token;
      },
    },
  });

