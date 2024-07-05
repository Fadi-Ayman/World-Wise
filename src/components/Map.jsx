import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import styles from "./Map.module.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useCities } from "../contexts/CityContext";
import { useGeolocation } from "./../hooks/useGeolocation";
import { initialPosition } from "../contexts/CityContext";
import { useRef } from "react";
import User from "./User";

function Map() {
  const [params] = useSearchParams();
  const lat = params.get("lat") || initialPosition.lat;
  const lng = params.get("lng") || initialPosition.lng;
  const { cities } = useCities();
  const navigate = useNavigate();
  const lastCityRef = useRef(initialPosition);
  // Custom hook
  const {
    position: userPosition,
    getPosition: getUserPosition,
    error: isUserLocationError,
  } = useGeolocation();
  const handleMapClick = (e) => {
    const { lat, lng } = e.latlng;
    lastCityRef.current = [lat, lng];
    navigate(`form?lat=${lat}&lng=${lng}`);
  };

  function handleGetUserLocation() {
    getUserPosition();
    if (isUserLocationError) {
      alert(isUserLocationError);
      return null;
    }
    lastCityRef.current = [lat, lng];
    userPosition &&
      navigate(`form?lat=${userPosition.lat}&lng=${userPosition.lng}`);
  }

  return (
    <div className={styles.mapContainer}>
      <MapContainer
        className={styles.map}
        center={
          lat && lng ? [lat, lng] : lastCityRef.current || initialPosition
        }
        zoom={6}
        scrollWheelZoom={true}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png" />
        {cities.map((city) => {
          return (
            <Marker position={city.position} key={city.id}>
              <Popup>
                {city.emoji} {city.cityName}
              </Popup>
            </Marker>
          );
        })}
        <MapEventsHandler handleMapClick={handleMapClick} />
        <ChangeCenter
          position={
            lat && lng ? [lat, lng] : lastCityRef.current || initialPosition
          }
        />
      </MapContainer>
      <button
        onClick={handleGetUserLocation}
        className={`cta ${styles.mapBtn}`}
      >
        Use Your Country
      </button>
      <User />
    </div>
  );
}

const ChangeCenter = ({ position }) => {
  const map = useMap();
  map.setView(position);
  return null;
};

const MapEventsHandler = ({ handleMapClick }) => {
  useMapEvents({
    click: (e) => handleMapClick(e),
  });
  return null;
};

export default Map;
