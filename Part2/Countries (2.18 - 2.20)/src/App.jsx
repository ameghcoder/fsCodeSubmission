import { useEffect, useState } from "react";
import axios from "axios";
import './index.css';
import APIs from "./components/APIs";
import Notification from "./components/Notification";
import CountryDetails from "./components/CountryDetails";
import WeatherDetails from "./components/WeatherDetails";

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
      .get(`${APIs.API_COUNTRY_DETAILS}/${countryName}`)
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
      .get(APIs.API_COUNTRY)
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
              <>
                <CountryDetails
                  name={countryData['name']['common']}
                  capital={countryData.capital[0]}
                  area={countryData.area}
                  languages={Object.values(countryData.languages)}
                  flag={countryData.flags.png}
                />
                <WeatherDetails location={countryData['name']['common']} />
              </> 
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
      </div>
    </>
  );
}

export default App;
