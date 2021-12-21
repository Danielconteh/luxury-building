import dynamic from 'next/dynamic'
import Head from 'next/head'
import * as Style from '../../styles/detail/map.module.scss'

const Map = ({ location, country }) => {
  let coordinates
  if (location && country) coordinates = location.coordinates
  const MapWithNoSSr = dynamic(() => import('./mapExtension'), { ssr: false })
  return (
    <>
      <Head>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <link
          rel='stylesheet'
          href='https://unpkg.com/leaflet@1.7.1/dist/leaflet.css'
          integrity='sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=='
          crossOrigin=''
        />
      </Head>
      <div className={Style.map_container}>
        <div className={Style.map_container_header}>location</div>
        <MapWithNoSSr coords={coordinates} country={country} />
        {/* <h1>MAP CONTAINER</h1> */}
      </div>
    </>
  )
}

export default Map
