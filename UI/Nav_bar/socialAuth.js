import { AiOutlineGoogle } from 'react-icons/ai'
import { FaApple, FaFacebookF } from 'react-icons/fa'
import { signIn, useSession } from 'next-auth/client'
import * as style from '../../styles/navbar.module.scss'

const SocialAuth = () => {
  const [session, loading] = useSession()
  return (
    <>
      <div className={style.social_link}>
        <div
          className={style.social_link_google}
          onClick={() => signIn('google')}
        >
          <span>
            <AiOutlineGoogle
              className={[style.social_link_icon, style.google_align].join(' ')}
            />
          </span>
          <span>Google</span>
        </div>

        <div
          className={style.social_link_facebook}
          onClick={() => signIn('facebook')}
        >
          <span>
            <FaFacebookF className={style.social_link_icon} />
          </span>
          <span> facebook</span>
        </div>
      </div>
    </>
  )
}

export default SocialAuth
