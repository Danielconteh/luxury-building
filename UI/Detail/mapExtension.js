import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

const MapExtension = ({ coords, country }) => {
  let logitude, latitude
  if (coords && country) {
    logitude = coords[0]
    latitude = coords[1]
  }

  return (
    <MapContainer
      center={[latitude, logitude]}
      zoom={10}
      scrollWheelZoom={false}
      dragging={false}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      <Marker position={[latitude, logitude]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  )
}

export default MapExtension

{
  /* <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
      /> */
}
