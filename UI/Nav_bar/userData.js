import Image from 'next/image';
import { useRouter } from 'next/router';
import {signIn, signOut } from 'next-auth/client';

import * as style from '../../styles/navbar.module.scss';

export const UserData = ({ fullname, email, photo }) => {
  const router = useRouter();

  // if there is no photo [use the default]
  return (
    <>
      {fullname ? (
        <div className={style.user}>
          <div className={style.user_img}>
            <Image
              src={
                photo.startsWith('https')
                  ? photo
                  : photo
                  ? `/uploads/Users-Images/${photo}`
                  : `/default.jpg`
              }
              alt=""
              width={500}
              height={500}
              objectFit="cover"
              // layout='intrinsic'
            />
          </div>
          <span className={style.user_name}>{fullname.split(' ')[0]}</span>

          {/* account & logout show only on hover*/}
          <div className={style.user_accout_logout}>
            <div>
              <span onClick={async () => await router.push('/account')}>
                Store
              </span>
            </div>

            <div
              onClick={async () =>
                signOut()
              }>
              <span>logout</span>
            </div>
          </div>
        </div>
      ) : (
        <div
          className={style.signInForm}
          onClick={async () => await router.push('/signIn')}>
          <button>sign in</button>
        </div>
      )}
    </>
  );
};
