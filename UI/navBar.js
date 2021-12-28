import { useRouter } from 'next/router'

// ==============================================
import * as style from '../styles/navbar.module.scss'
// ==============================================
import { NavHeader } from './Nav_bar/nav'

import { UserData } from './Nav_bar/userData'

//========================================



// ============= COMPONENT =====================
const NavBar = ({ fullname, email, photo }) => {
  const router = useRouter()
 
  return (
    <div className='nav'>
      <div className={style.navContainer}>
        <NavHeader />
        <UserData
          fullname={fullname}
          email={email}
          photo={photo}
        />
      </div>
      </div>    
  )
}

export default NavBar
