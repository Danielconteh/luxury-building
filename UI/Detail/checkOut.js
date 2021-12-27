import Image from 'next/image'
import Link from 'next/link'
// import Head from 'next/head'
import axios from 'axios'
import { useSession } from 'next-auth/client';
import { useState } from 'react'
import Script from 'next/script';
import { useRouter } from 'next/router';


import * as Style from '../../styles/detail/checkOut.module.scss'
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';




const Buy = ({ image, slug }) => {
  const router = useRouter();
  const [session] = useSession();
  const [puc,setPuc] = useState(false)

  const buyHouse = async (houseId) => {
    setPuc(true)
    const stripe = Stripe(process.env.NEXT_PUBLIC_STRIP_PUBLIC_KEY);

    try {
      const session = await axios(`/api/buyHouse/${houseId}`);
      await stripe.redirectToCheckout({ sessionId: session.data.result.id });
      setPuc(false);
    } catch (err) {
      console.log(err)
      alert(err.message);
      setPuc(false);
    }
  };


  return (
    <>
      <Script id="stripe-js" src="https://js.stripe.com/v3/" />

      <div className={Style.grid_checkOut_container}>
        <div className={Style.grid_checkOut_container_header}>
          puchase house
        </div>
        <div className={Style.grid_checkOut_container__item}>
          <div className={Style.grid_checkOut_container__item_img}>
            {image && (
              <Image
                alt="house image"
                src={image}
                width={1000}
                height={667}
                objectFit="cover"
                quality={100}
              />
            )}
          </div>

          <div className={Style.grid_checkOut_container__item_text}>
            <div> What are you waiting for?</div>
            <div>
              7 days. 1 adventure. Infinite memories. Make it yours today!
            </div>
          </div>
          {session && session.user ? (
            <div className={Style.grid_checkOut_container__item_btn}>
             
              <LoadingButton
                onClick={async () => await buyHouse(slug)}
                loading={puc ? true : false}
                loadingPosition="end"
                endIcon={<SendIcon />}
                variant="outlined">
                  puchase
              </LoadingButton>
            </div>
          ) : (
            <div className={Style.grid_checkOut_container__item_btn}>
              <Button
                onClick={async () => await router.push('/signIn')}
                variant="outlined">
                signIn
              </Button>{' '}
              to buy house
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Buy
