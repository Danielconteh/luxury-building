import {useReducer} from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'

import * as Style from '../styles/houses.module.scss'
import { reducer } from './house/paginate';

import { FiMapPin, FiUsers } from 'react-icons/fi';
import { IoExpandOutline } from 'react-icons/io5';
import { HiOutlineKey } from 'react-icons/hi';



const initialState = {
  //0 represent page
  start: (1 - 1) * process.env.NEXT_PUBLIC_RESULT_PER_PAGE,
  end: 1 * process.env.NEXT_PUBLIC_RESULT_PER_PAGE,
  page: 1,
  type: 'next'
};
 


export default function House({ data }) {
  const router = useRouter()
  const [paginate, dispatch] = useReducer(reducer, initialState)

 
// PAGINATED LOGIC
  const pagButton = (gotoPage) => {
    const {type,page} = paginate   
    return <>
        <button
          onClick={() =>
            dispatch({
              page:
                type === gotoPage ? page - 1 : page + 1,
              totalResult: data,
            })
          }>
          {type === gotoPage ? <span>&larr;</span> : <span>&rarr;</span>}

          <span>
            page{' '}
            {type === gotoPage ? page - 1 : page + 1}
          </span>
        </button>
      </>
    }

// RENDER PAGINATE BUTTON
  const htmlButton = () => {    
    if (paginate.type === 'both') return (
      <>
        {pagButton('both')}
        {pagButton('next')}
      </>
    );
    return pagButton('prev');   
    }
    

// FORMATE THE AMOUNT
  
  const amount = (p) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(p);
  
    return (
      <div className="houses">
        <div className={Style.house_wrapper}>
          {data?.slice(paginate.start, paginate.end).map((el, i) => {
            const { image, price, country, name, rooms, meter, slug } = el;
            return (
              <div key={i}>
                <article className={Style.house}>
                  <div className={Style.house_img}>
                    <Image
                      src={image}
                      alt=""
                      width={1000}
                      height={667}
                    />
                  </div>
                  <h4 className={Style.house_title}>{name}</h4>
                  <div className={Style.house_country}>
                    <span className={Style.icons}>
                      <FiMapPin />
                    </span>
                    {country}
                  </div>
                  <div className={Style.house_room}>
                    <span className={Style.icons}>
                      <FiUsers />
                    </span>
                    {rooms} Rooms{' '}
                  </div>
                  <div className={Style.house_meter}>
                    <span className={Style.icons}>
                      <IoExpandOutline />
                    </span>
                    {meter} M<sup>2</sup>{' '}
                  </div>
                  <div className={Style.house_price}>
                    <span className={Style.icons}>
                      <HiOutlineKey />
                    </span>
                    {amount(price)}
                  </div>
                  <a
                    onClick={() => router.push(`/${slug}`)}
                    className={Style.house_slug}>
                    detail
                  </a>
                </article>
              </div>
            );
          })}
        </div>

        <div className={Style.paginate_container}>{htmlButton()}</div>
      </div>
    );
}



