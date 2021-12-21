
import { useRouter } from 'next/router'

import * as style from '../../styles/navbar.module.scss'

export const NavHeader = () => {
  const router = useRouter()

  return (
    <>
      <span>
        <a onClick={() => router.push(`/`)} className={style.title_link}>
          luxry zone
        </a>
      </span>

      <div className={style.logo}>
        {/* <img className={style.logo_img} src='logo-white.png' alt='' /> */}
        logo
      </div>
      {/* ====================================================================== */}

      {/* ====================================================================== */}
    </>
  );
}
