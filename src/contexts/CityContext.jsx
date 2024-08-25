import { createContext, useState, useEffect, useContext, useCallback } from "react";
const CityContext = createContext();
const BASE_URL = `http://localhost:8000/cities`;

const initialPosition = {
  lat: 30.033333,
  lng: 31.233334,
};

function CityProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isCityiesLoading, setIsCitiesLoading] = useState(false);
  const [isCitiesError, setIsCitiesError] = useState(false);
  const [currentCity, setCurrentCity] = useState({});
  const [isCurrentCityLoading, setIsCurrentCityLoading] = useState(false);
  const [isCurrentCityError, setIsCurrentCityError] = useState(false);
  const [position, setPosition] = useState(initialPosition);

  useEffect(() => {
    async function getCities() {
      setIsCitiesLoading(true);
      try {
        const res = await fetch(BASE_URL);
        const data = await res.json();
        setCities(data);
      } catch {
        setIsCitiesError(true);
      } finally {
        setIsCitiesLoading(false);
      }
    }

    getCities();
  }, []);

  const getCurrentCity = useCallback(async function getCurrentCity(id) {
    setIsCurrentCityLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/${id}`);
      const data = await res.json();
      setCurrentCity(data);
    } catch (error) {
      setIsCurrentCityError(true);
    } finally {
      setIsCurrentCityLoading(false);
    }
  },[])

  async function deleteCity(id) {
    await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
    });
    setCities(
      cities.filter((city) => {
        return city.id !== id;
      })
    );
  }

  return (
    <CityContext.Provider
      value={{
        cities,
        deleteCity,
        setCities,
        getCurrentCity,
        currentCity,
        isCityiesLoading,
        isCitiesError,
        isCurrentCityLoading,
        isCurrentCityError,
        position,
        setPosition,
      }}
    >
      {children}
    </CityContext.Provider>
  );
}

function useCities() {
  const context = useContext(CityContext);
  if (context === undefined)
    throw new Error("The Context Used Out Of The Provider Range");
  return context;
}

export { CityProvider, useCities, initialPosition };
