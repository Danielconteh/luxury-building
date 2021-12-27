import NavBar from '../UI/navBar';
import Carousel from '../UI/carousel';
// import fetch from 'node-fetch'
import { useState, useRef } from 'react';
import axios from 'axios';
import Head from 'next/head';

import { useRouter } from 'next/router';
import { House } from '../mongodConnection/connection';

// -------------- COMPONENT------------------
import Description from '../UI/Detail/description';
import IndoorImage from '../UI/Detail/indoorImage';
import Buy from '../UI/Detail/checkOut';
import Footer from '../UI/footer';
import Map from '../UI/Detail/map';
import { useSession } from 'next-auth/client';
import WriteReviews from '../UI/Detail/writeReview';
import Reviews from '../UI/Detail/reviews';
import { Layout } from '../UI/Layout';
// --------------END OF COMPONENT ❤ ------------------

const Detail = ({ result }) => {
  const router = useRouter();

  const [session, loading] = useSession();

  if (result && !loading) {
    result = JSON.parse(result);
    if (session && session.user) {
      const user = session?.user;
      result.user = {
        email: user.email,
        photo: user.image,
        fullname: user.name,
        sessionToken: true,
      };
    }

    // const { data } = result;

    const notRotate = false; //disable auto rotate the banner
    const buyInfo = { image: result?.image, slug: result?.slug };
    //RESUABLE COMPONENT HAVE ALREADY BEEN STYLE[NavBar,Carousel,Footer]



    return (
      <>
        <Layout>
          <Head>
            <title>{result.slug}</title>

            <meta
              name="keywords"
              content="home, building, buy house, office building, sell house, puschased house"
            />
            <meta name="description" content="free house demo project!" />

            <meta name="author" content="Daniel Conteh" />

            {/* <meta http-equiv="refresh" content="30"/> */}
          </Head>
          <div className="grid_container grid_container_detail">
            <NavBar {...result.user} />
            <Carousel data={[result]} banPlaying={notRotate} />
            <Description {...result} />
            <IndoorImage {...result} />
            <Map {...result} />
            <Reviews review={result?.reviews} />
            <Buy {...buyInfo} />
            <WriteReviews
              id={result.id}
            />
            <Footer />
          </div>
        </Layout>
      </>
    );
  }
  return <h1>loading...</h1>;
};

// SERVERSIDE CODE!
export async function getStaticPaths() {
  const data = await House.find({});

  const paths =
    data &&
    data.map((el) => {
      return { params: { slug: el?.slug } };
    });
  return { paths, fallback: false }; // See the "fallback" section below
}

export async function getStaticProps(context) {
  const { slug } = context.params;

  const data = await House.findOne({ slug }).populate({
    path: 'reviews', // virtual populate
    select: '-__v',
  });

  const result = JSON.stringify(data);

  if (!result) return { notFound: true };
  return {
    revalidate: 10,
    props: { result }, // will be passed to the page component as props
  };
}

export default Detail;
