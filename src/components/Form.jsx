// Reverse GeoCoding EndPoint => "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import DatePicker from "react-datepicker";

import styles from "./Form.module.css";
import "react-datepicker/dist/react-datepicker.css";
import { useCities } from "../contexts/CityContext";
import Message from "./Message";

const BASE_URL = `http://localhost:8000/cities`;

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const [searchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const GEO_CODING_BASE_URL = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`;

  const notesRef = useRef(null);
  const navigate = useNavigate();
  const { cities, setCities } = useCities();
  const [isGeoCodingError, setIsGeoCodingError] = useState(false);

  const [cityName, setCityName] = useState("");
  const [emoji, setEmoji] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [cityToAdd, SetCityToAdd] = useState("");

  // REVERSE GEOCODING
  useEffect(() => {
    async function ReverseGeocoding() {
      try {
        const res = await fetch(GEO_CODING_BASE_URL);
        const data = await res.json();
        let { city: cityName, countryName: country, countryCode: emoji } = data;
        if (!country || !cityName) {
          setIsGeoCodingError("No Country Clicked, Please Try To Click Again");
          return;
        } else if (
          country ===
          "United Kingdom of Great Britain and Northern Ireland (the)"
        ) {
          country = "United Kingdom";
        }
        setCityName(cityName);
        setEmoji(convertToEmoji(emoji));

        SetCityToAdd(
          JSON.stringify({
            cityName: cityName,
            country: country,
            emoji: convertToEmoji(emoji),
            date: date,
            notes: notes || "No Notes",
            position: {
              lat: lat,
              lng: lng,
            },
          })
        );

        setIsGeoCodingError(null);
      } catch (error) {
        setIsGeoCodingError("Cannot Fetch Data");
        console.log(error);
      } finally {
      }
    }

    ReverseGeocoding();
  }, [GEO_CODING_BASE_URL, date, lat, lng, notes]);

  // Handling Foucus on Notes in Form
  useEffect(() => {
    !isGeoCodingError && notesRef.current.focus();
  }, [isGeoCodingError, lat, lng]);

  // Handling add
  async function handleAddBtn() {
    try {
      const res = await fetch(`${BASE_URL}`, {
        method: "POST",
        body: cityToAdd,
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      setCities([...cities, data]);

      navigate(`/applayout/cities?lat=${lat}&lng=${lng}`);
    } catch (error) {
    } finally {
    }
  }

  function handleBackBtn() {
    navigate("/applayout/cities");
  }

  if (isGeoCodingError)
    return <Message emoji="🙁" message={isGeoCodingError} />;

  return (
    <form
      onClick={(e) => {
        e.preventDefault();
      }}
      className={styles.form}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
          disabled
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={`react-datepickers ${styles.row}`}>
        <DatePicker
          selected={date}
          onChange={(date) => setDate(date)}
          dateFormat={"dd/MM/YYYY"}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">
          Notes about your trip to{" "}
          <span className="notes-city-name">{cityName}</span>
        </label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
          placeholder="Write Some Notes ..."
          rows="3"
          cols="10"
          ref={notesRef}
        />
      </div>

      <div className={styles.buttons}>
        <button onClick={handleAddBtn} className="btn primary">
          Add
        </button>
        <button onClick={handleBackBtn} className="btn back">
          Back
        </button>
      </div>
    </form>
  );
}

export default Form;
