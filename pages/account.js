import {useState} from 'react'
import Footer from '../UI/footer'
import NavBar from '../UI/navBar'
import * as Style from '../styles/account.module.scss';
import Image from 'next/dist/client/image';
import { useSession, getSession } from 'next-auth/client';
// import fetch from 'node-fetch';
// import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Puchase, User } from '../mongodConnection/connection';


 // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'



const Account = ({results}) => {
  const [session, loading] = useSession();
  const router = useRouter();
  const [data, setData] = useState(JSON.parse(results));
    console.log(JSON.parse(results));
  if (!loading) {
    const user = session?.user;
    let results;

    if (user) {
       results = {
         email: user.email,
         photo: user.image,
         fullname: user.name,
       };
    }
    

    const handleDelete = async id => {
        try {
          if (confirm('Are you sure, you want to perform this action!')) {
            
            const res = await axios.delete(`http://localhost:3000/api/buyHouse/${id}`);
            
            if (res.status === 204) {
              const filter =  data.filter(el => {
                return el._id !== id;
           })
           // updat the UI
              setData(filter)
              return
          }
          } else {
            console.log('undone!')
            return
         }
        } catch (err) {
          alert(err.message)
      }    
      
    }
      
      return (
        <div className={Style.account_container}>
          <NavBar {...results} />
          <div className={Style.puschased_house}>
            <div className={Style.content_wrapper}>
              {data.length ? (
                data.map((el) => {
                  const { paid, _id } = el;
                  const { country, image, meter, name, price, rooms, slug } =
                    el.house;
                  return (
                    <>
                      <article key={name}>
                        <div className={Style.content_wrapper_img_container}>
                          <Image
                            src={image}
                            alt={name}
                            width={1000}
                            height={667}
                          />
                          {paid && (
                            <div
                              className={
                                Style.content_wrapper_img_container_paid
                              }>
                              <span>paid</span>
                            </div>
                          )}
                        </div>
                        <h4 className={Style.content_wrapper_title}>{name}</h4>
                        <div className={Style.content_wrapper_country}>
                          {country}
                        </div>
                        <div className={Style.content_wrapper_meter}>
                          {meter} M<sup>2</sup>{' '}
                        </div>
                        <div className={Style.content_wrapper_room}>
                          {' '}
                          {rooms} Rooms{' '}
                        </div>
                        <div className={Style.content_wrapper_price}>
                          {price}
                        </div>

                        <div
                          className={
                            Style.content_wrapper_slug_delete_container
                          }>
                          <button
                            className={Style.content_wrapper_delete}
                            onClick={() => handleDelete(_id)}>
                            delete
                          </button>
                          <button
                            className={Style.content_wrapper_slug}
                            onClick={() => router.push(`/${slug}`)}>
                            detail
                          </button>
                        </div>
                      </article>
                    </>
                  );
                })
              ) : (
                <div className={Style.NOT_PUCHASED}>no house Puchase yet!</div>
              )}
            </div>
          </div>

          <Footer />
        </div>
      );
    
    
  }
  return <div>loading...</div>
}







export async function getServerSideProps({req}) {
  const session = await getSession({ req });

  if (!session && !session.user) return {redirect: {destination: '/signin',permanent: false},};
  
   
  const user = await User.findOne({ email: session.user?.email });
  const data = await Puchase.find({ user: user._id });
  const results = JSON.stringify(data)

  return {
    props: { results }, // will be passed to the page component as props
  };
}

export default Account



