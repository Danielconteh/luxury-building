import React,{useRef} from 'react';
import { providers, signIn, getSession, csrfToken } from 'next-auth/client';
import Footer from '../../UI/footer';
import NavBar from '../../UI/navBar';
import * as Style from '../../styles/signIn.module.scss';

export default function SignIn({ providers, csrfToken }) {

  return (
    <>
      <NavBar />

      <div className={Style.signIn_Container}>

        <div className={Style.signIn_Container_social_Auth}>
          {/* <h1 className={Style.signIn_Container_social_Auth_header}>
            welcome to luxzry zone signIn page
          </h1> */}
          {providers &&
            Object.values(providers).map((provider) => {
              const { name } = provider;
              if (provider.name === 'Credentials') return;
              return (
                <button
                  className={Style.name}
                  key={provider.name}
                  onClick={() =>
                    signIn(provider.id, {
                      callbackUrl: '/',
                    })
                  }>
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

