import React from 'react';
import { providers, signIn, getSession, csrfToken } from 'next-auth/client';
import Footer from '../UI/footer';
import NavBar from '../UI/navBar';
import * as Style from '../styles/signIn.module.scss';

export default function SignIn({ providers, csrfToken }) {
  return (
    <>
      <NavBar />

      <div className={Style.signIn_Container}>
        {/* <h1 className={Style.signIn_Container_header}>
          welcome to luxzry zone signIn page
        </h1> */}
        <form method="post" action="/api/auth/signin/email">
          <input name="csrfToken" type="hidden" defaultValue={csrfToken} />

          <input
            type="email"
            id="email"
            name="email"
            placeholder="enter your email..."></input>
          <label id="email">email address</label>
          <button type="submit">sign in with email</button>
        </form>

        <div className={Style.signIn_Container_social_Auth}>
          {providers &&
            Object.values(providers).map((provider) => {
              if (provider.name === 'Email') return;
              return (
                <button
                  className={provider.name}
                  key={provider.name}
                  onClick={() => signIn(provider.id)}>
                  sign in with {provider.name}{' '}
                </button>
              );
            })}
        </div>
      </div>
      <Footer />
    </>
  );
}


SignIn.getInitialProps = async (context) => {
  const { req, res } = context;
  const session = await getSession({ req });

  if (session && res && session.accessToken) {
    res.writeHead(302, {
      Location: '/',
    });
    res.end();
    return;
  }

  return {
    session: undefined,
    providers: await providers(context),
    csrfToken: await csrfToken(context),
  };
};


// export const getServerSideProps = async (context) => {
//   const { req, res } = context;
//   const session = await getSession({ req });

//   if (session && res && session.accessToken) {
//     res.writeHead(302, {
//       location: '/',
//     });
//     res.end();
//     return;
//   }

//   return {
//     props: {
//       session: undefined,
//       providers: await providers(context),
//       csrfToken: await csrfToken(context),
//     }, // for email signig only}
//   };
// };
