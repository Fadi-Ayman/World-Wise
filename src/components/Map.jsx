import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import styles from "./Map.module.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useCities } from "../contexts/CityProvider";

const initialPosition = {
  lat:51.505 ,
  lng:-0.09
}


function Map() {
  const [params, setParams] = useSearchParams();
  const lat = params.get("lat");
  const lng = params.get("lng");
  const {cities} = useCities()
  const navigate = useNavigate()
  
  
  const handleMapClick = (e) => {
    const {lat,lng} = e.latlng
    navigate(`form?lat=${lat}&lng=${lng}`)
  };

  return (
    <div className={styles.mapContainer}>
      <MapContainer
        className={styles.map}
        center={lat&&lng ? [lat,lng] :initialPosition}
        zoom={6}
        scrollWheelZoom={true}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"  />
        {cities.map(city =>{
        return <Marker 
        position={city.position}
        key={city.id}>
          <Popup>
            {city.emoji} {city.cityName}
          </Popup>
        </Marker>})}
        <MapEventsHandler handleMapClick={handleMapClick} />
      </MapContainer>
    </div>
  );
}

const MapEventsHandler = ({ handleMapClick }) => {
  useMapEvents({
    click: (e) => handleMapClick(e),
  });
  return null;
};

export default Map;
