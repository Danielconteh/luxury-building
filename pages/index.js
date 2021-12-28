import NavBar from '../UI/navBar';
import Carousel from '../UI/carousel';
import HouseUI from '../UI/houses';
import Features from '../UI/features';
import Gallary from '../UI/gallary';
import Footer from '../UI/footer';
import Loader from '../UI/loader';
import { useSession } from 'next-auth/client';
import { Layout } from '../UI/Layout';
import Head from 'next/head';
import { House } from '../mongodConnection/connection';

const Home = ({ results }) => {
  const [session, loading] = useSession();
    console.log(session);


  if (results && !loading) {
    results = JSON.parse(results);
    const user = session?.user;

    if (user && user.name)
      results.user = {
        email: user.email,
        photo: user.image,
        fullname: user.name,
      };

    // DESTRUCTURE THE THE DATA[CUT THE DATA]
    // const { data } = results;
    const rotate = true;
    return (
      <>
        <Layout>
          <Head>
            <title>home page</title>

            <meta charset="UTF-8" />
            <meta
              name="keywords"
              content="home, building, buy house, office building, sell house, puschased house"
            />
            <meta name="description" content="free house demo project!" />

            <meta name="author" content="Daniel Conteh" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0"
            />

            {/* <meta http-equiv="refresh" content="30"/> */}
          </Head>

          <div className="grid_container">
            <NavBar {...results.user} />
            <Carousel data={results} banPlaying={rotate} />
            <HouseUI data={results} />
            <Features />
            <Gallary />
            <Footer />
          </div>
        </Layout>
      </>
    );
  }
  return <Loader/>;
};

// GET ALL HOUSE AND PASS THE DATA TO THE HOUSE AS PROPS

export async function getStaticProps(context) {
  const data = await House.find({});
  const results = JSON.stringify(data);
  if (!results) return { notFound: true };
  return {
    props: { results }, // will be passed to the page component as props
    revalidate: 10,
  }; 
}

export default Home;
