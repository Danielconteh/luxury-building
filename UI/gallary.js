import Image from 'next/image'
import * as style from '../styles/gallary.module.scss'

const PhotoData = [
  'https://res.cloudinary.com/dbmrdwsfb/image/upload/v1639457024/LUXURY_ZONE/01_ygdbex.jpg',
  'https://res.cloudinary.com/dbmrdwsfb/image/upload/v1639457026/LUXURY_ZONE/02_y3wgwg.jpg',
  'https://res.cloudinary.com/dbmrdwsfb/image/upload/v1639457029/LUXURY_ZONE/13_v2masw.jpg',
  'https://res.cloudinary.com/dbmrdwsfb/image/upload/v1639457037/LUXURY_ZONE/12_cswzjw.jpg',
  'https://res.cloudinary.com/dbmrdwsfb/image/upload/v1639457037/LUXURY_ZONE/16_awyscr.jpg',
  'https://res.cloudinary.com/dbmrdwsfb/image/upload/v1639457043/LUXURY_ZONE/17_t0iosg.jpg',
  'https://res.cloudinary.com/dbmrdwsfb/image/upload/v1639457044/LUXURY_ZONE/15_cjde54.jpg',
  'https://res.cloudinary.com/dbmrdwsfb/image/upload/v1639457047/LUXURY_ZONE/11_g4mf4n.jpg',
  'https://res.cloudinary.com/dbmrdwsfb/image/upload/v1639457047/LUXURY_ZONE/09_co2d8s.jpg',
  'https://res.cloudinary.com/dbmrdwsfb/image/upload/v1639457010/LUXURY_ZONE/03_oftszn.jpg',
  'https://res.cloudinary.com/dbmrdwsfb/image/upload/v1639457015/LUXURY_ZONE/04_b43uc8.jpg',
  'https://res.cloudinary.com/dbmrdwsfb/image/upload/v1639457017/LUXURY_ZONE/05_dkftcn.jpg',
  'https://res.cloudinary.com/dbmrdwsfb/image/upload/v1639457020/LUXURY_ZONE/08_ubxhhw.jpg',
  'https://res.cloudinary.com/dbmrdwsfb/image/upload/v1639457021/LUXURY_ZONE/10_dlgt32.jpg',
  'https://res.cloudinary.com/dbmrdwsfb/image/upload/v1639456996/LUXURY_ZONE/06_q1pehy.jpg',
  'https://res.cloudinary.com/dbmrdwsfb/image/upload/v1639456999/LUXURY_ZONE/07_w2r6ky.jpg',
  'https://res.cloudinary.com/dbmrdwsfb/image/upload/v1639457047/LUXURY_ZONE/14_awuznb.jpg',
];

const Gallary = () => {
  return (
    <div className='gallary'>
      <div className={style.gallary_container}>
        {PhotoData.map((photo, i) => {
          return (
            <div
              style={{
                width: 'auto',
                height: 'auto',
                position: 'relative',
              }}
              className={`img${i}`}
              key={i}
            >
              <Image
                src={photo}
                alt={photo}
                objectFit='cover'
                layout='fill'
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
export default Gallary
