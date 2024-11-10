import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import './index.css';

const API_COUNTRY = "http://localhost:3001/Countries";
const API_COUNTRY_DETAILS = "https://studies.cs.helsinki.fi/restcountries/api/name";
const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;


const Notification = ({ message, type }) => {
  if (!message) {
    return null;
  }

  return (
    <div className={type === 'error' ? 'error-notification' : 'success-notification'}>
      {message}
    </div>
  );
};

Notification.propTypes = {
  message: PropTypes.string,
  type: PropTypes.string,
};

function ShowDetails({ name, capital, area, languages, flag }) {
  return (
    <>
      <h1>{name}</h1>
      <p>
        <strong>Capital</strong> {capital}
      </p>
      <p>
        <strong>Area</strong> {area}
      </p>
      <h2>Languages</h2>
      <ul>
        {languages.map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={flag} alt="Country Flag" style={{borderRadius: '10px', boxShadow: '4px 8px 16px 0px rgba(0, 0, 0, 0.2)', border: '1px solid rgba(0, 0, 0, 0.2)'}} />
    </>
  );
}

ShowDetails.propTypes = {
  name: PropTypes.string.isRequired,
  capital: PropTypes.string.isRequired,
  area: PropTypes.number.isRequired,
  languages: PropTypes.arrayOf(PropTypes.string).isRequired,
  flag: PropTypes.string.isRequired,
};


const ShowWeather = () => {

  return(
    <></>
  );
}

function App() {
  const [matchCountries, setMatchCountries] = useState([]);
  const [countries, setCountries] = useState([]);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [search, setSearch] = useState("");
  const [countryData, setCountryData] = useState({});
  const [showSpecific, setShowSpecific] = useState(false);

  const getAndSetCountryData = (countryName) => {
    axios
      .get(`${API_COUNTRY_DETAILS}/${countryName}`)
      .then((response) => response.data)
      .then((data) => {
        console.log(data);
        setCountryData(data);
      })
      .catch(() => {
        setMessage("Country details not found");
        setMessageType("error");
        setTimeout(() => {
          setMessage("");
        }, 5000);
      });
  }

  const FilterCountries = (e) => {
    setShowSpecific(false);
    const searchValue = e.target.value;
    const filteredCountry = countries.filter((country) =>
      country.name.toLowerCase().includes(searchValue.toLowerCase())
    );

    if (filteredCountry.length === 1) {
      getAndSetCountryData(filteredCountry[0].name);
    } else{
      setCountryData({})
    }
    setMatchCountries(filteredCountry);
    setSearch(searchValue);
  };

  useEffect(() => {
    axios
      .get(API_COUNTRY)
      .then((response) => response.data)
      .then((data) => {
        setCountries(data);
      })
      .catch((err) => {
        setMessage(err.message);
        setMessageType("error");
        setTimeout(() => {
          setMessage("");
        }, 5000);
      });
  }, []);

  // show specific country details
  const specificCountryDetails = (countryName) => {
    setShowSpecific(true);
    getAndSetCountryData(countryName);
  }

  return (
    <>
      <Notification message={message} type={messageType} />
      <div>
        <label htmlFor="country">Find Countries</label>{" "}
        <input
          type="search"
          value={search}
          name="country"
          id="country"
          onChange={FilterCountries}
        />
      </div>
      <hr />
      <div>
        <div>
          {matchCountries.length === 1 || showSpecific ? (
            countryData.name ? 
              <ShowDetails
                name={countryData['name']['common']}
                capital={countryData.capital[0]}
                area={countryData.area}
                languages={Object.values(countryData.languages)}
                flag={countryData.flags.png}
              />
            : 
              <h2>No Country Data Found</h2>
          ) : matchCountries.length > 10 ? (
            "Too many matches, specify another filter"
          ) : (
            matchCountries.map((country) => (
              <div key={country.name} style={{ borderBottom: "1px solid black" }}>
                <strong>
                  {country.name}
                </strong>
                <button onClick={()=> specificCountryDetails(country.name)} type="button" style={{marginLeft: '10px'}}>Show</button>
              </div>
            ))
          )}
        </div>
        <ShowWeather />
      </div>
    </>
  );
}

export default App;
