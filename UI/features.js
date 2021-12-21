import * as style from '../styles/features.module.scss'
import { BsGlobe2, BsTrophy } from 'react-icons/bs';
import { HiOutlineKey, HiOutlinePresentationChartLine } from 'react-icons/hi';
import { FiMapPin, FiLock } from 'react-icons/fi';

const Features = () => {
  return (
    <div className="features">
      <div className={style.features_container}>
        <div className={style.features_item}>
          <div className={style.features_item_header}>
            <span></span>
            <div>
              <span className={style.icons}>
                <HiOutlineKey />
              </span>
              new home in one week
            </div>
          </div>

          <div className={style.features_item_text}>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facilis
            minus magnam repellendus quaerat?
          </div>
        </div>

        <div className={style.features_item}>
          <div className={style.features_item_header}>
            <div>
              <span className={style.icons}>
                <BsTrophy />
              </span>
              only the best properties
            </div>
          </div>

          <div className={style.features_item_text}>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facilis
            minus magnam repellendus quaerat?
          </div>
        </div>

        <div className={style.features_item}>
          <div className={style.features_item_header}>
            <div>
              <span className={style.icons}>
                <BsGlobe2 />
              </span>
              world's best luxury buildings
            </div>
          </div>

          <div className={style.features_item_text}>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facilis
            minus magnam repellendus quaerat?
          </div>
        </div>

        <div className={style.features_item}>
          <div className={style.features_item_header}>
            <div>
              <span className={style.icons}>
                <FiMapPin />
              </span>
              all buildings in top locations
            </div>
          </div>

          <div className={style.features_item_text}>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facilis
            minus magnam repellendus quaerat?
          </div>
        </div>

        <div className={style.features_item}>
          <div className={style.features_item_header}>
            <div>
              <span className={style.icons}>
                <FiLock />
              </span>
              secure payments
              {/* on luxury zone */}
            </div>
          </div>

          <div className={style.features_item_text}>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facilis
            minus magnam repellendus quaerat?
          </div>
        </div>

        <div className={style.features_item}>
          <div className={style.features_item_header}>
            <div>
              <span className={style.icons}>
                <HiOutlinePresentationChartLine />
              </span>
              top 1% realtors
            </div>
          </div>

          <div className={style.features_item_text}>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facilis
            minus magnam repellendus quaerat?
          </div>
        </div>
      </div>
    </div>
  );
}

export default Features
