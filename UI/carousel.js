import Image from 'next/image'

import TweenOne from 'rc-tween-one'
import BannerAnim, { Element } from 'rc-banner-anim'

import 'rc-banner-anim/assets/index.css'
const BgElement = Element.BgElement


const aniStyle = [
  [
    { x: 50, opacity: 0, type: 'from', delay: 100 },
    { y: 50, opacity: 0, type: 'from', delay: 100 },
  ],

  [
    { y: -50, opacity: 0, type: 'from', delay: 100 },
    { x: -50, opacity: 0, type: 'from', delay: 100 },
  ],
  [
    { x: -50, opacity: 0, type: 'from', delay: 100 },
    { y: 50, opacity: 0, type: 'from', delay: 100 },
  ],

  [
    { y: -50, opacity: 0, type: 'from', delay: 100 },
    { y: 50, opacity: 0, type: 'from', delay: 100 },
  ],
];


const random_banner_user_title = ['Own your house in just a second','experience Ulitimate total freedom with luxury zone','acheive your long awaited dream', 'feel the experience of royality']


const Carousel = ({ data, banPlaying }) => {
  

  return (
    <div className='carousel'>
      <BannerAnim
        prefixCls='banner-user'
        autoPlay={banPlaying}
        dragPlay={false}
        arrow={false}
        thumb={false}
        duration={700}
        // type={['gridBar', 'grid']}
      >
        {data &&
          data.map((el, i) => {
            if (el) {
              const { image, country, name, slug } = el

             const num = Math.floor(Math.random() * aniStyle.length);


              return (
                <Element prefixCls="banner-user-elem" key={`${i}`}>
                  <BgElement
                    key="bg"
                    className="bg"
                    style={{
                      backgroundPosition: 'center',
                      objectFit: 'contain',
                      width: '100%',
                      height: '100%',
                      objectPosition: '0 10%',

                      // background: 'URL(https://unsplash.com/photos/aVW-9y-sS3E)',
                    }} //'URL(https://unsplash.com/photos/aVW-9y-sS3E)'
                  >
                    <div
                      className="carousel_img_container"
                      style={{
                        width: '100%',
                        height: '100%',
                        position: 'relative',
                      }}>
                      {image &&
                        <Image
                          // src={`/uploads/House-Images/${image}`}
                          src={image}
                          alt={image}
                          layout="fill"
                          objectFit="cover"
                          objectPosition="center center"
                          loading="eager"
                        />
                      }
                      <div className="carousel_overlayer"></div>
                    </div>
                  </BgElement>

                  {/* random style of ani */}
                  <TweenOne
                    className="banner-user-title"
                    animation={aniStyle[num][0]}>
                    {name}
                  </TweenOne>
                  <TweenOne
                    className="banner-user-text"
                    animation={aniStyle[num][1]}>
                    {random_banner_user_title[num]}
                  </TweenOne>
                </Element>
              );
            }
          })}
      </BannerAnim>
    </div>
  )
}
export default Carousel

{
  /* <Element prefixCls='banner-user-elem' key='1'>
          <BgElement
            key='bg'
            className='bg'
            style={{
              background: '#64CBCC',
            }}
          />
          <TweenOne
            className='banner-user-title'
            animation={{ y: 90, opacity: 0, type: 'from' }}
          >
            Ant Motion Banner
          </TweenOne>
          <TweenOne
            className='banner-user-text'
            animation={{ y: 90, opacity: 0, type: 'from', delay: 100 }}
          >
            The Fast Way Use Animation In React
          </TweenOne>
        </Element> */
}
