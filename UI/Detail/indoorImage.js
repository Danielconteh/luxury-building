import * as Styles from '../../styles/detail/showCase.module.scss'
import Image from 'next/image'

const IndoorImage = ({ images }) => {
  return (
    <>
      <div className={Styles.images_contaner}>
        <div className={Styles.images_contaner__header}>preview</div>
        <div className={Styles.images_contaner__wrapper}>
          {images && images?.map((image, i) => (
            <div key={i} className={Styles.image__design}>
              <Image
                // src={`/uploads/House-Images/${image}`}
                src={image}
                alt={`image${[i]}`}
                width={2000} 
                height={1330}
                objectFit='fill'
                loading='eager'
                layout='responsive'

                // placeholder='blur'
              />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default IndoorImage
