import axios from "axios";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import APIs from "./APIs";


// Weather icons by description data
const WeatherIconsByDescription = {
    "clear sky": "01n@2x.png",
    "few clouds": "02n@2x.png",
    "scattered clouds": "03n@2x.png",
    "broken clouds": "04n@2x.png",
    "shower rain": "09n@2x.png",
    "rain": "10n@2x.png",
    "thunderstorm": "11n@2x.png",
    "snow": "13n@2x.png",
    "light snow": "13n@2x.png",
    "mist": "50n@2x.png"
}

const WeatherDetails = ({location}) => {
    const [temp, setTemp] = useState();
    const [wind, setWind] = useState();
    const [imgUrl, setImgUrl] = useState();
  
    useEffect(() => {
      const FINAL_API = APIs.WEATHER_API.replace("{location}", location);
      axios
      .get(FINAL_API)
      .then(response => response.data)
      .then(data => {
        console.log(data);
        setTemp((294.98 - parseFloat(data["main"]["temp"])).toFixed(2));
        setWind(data["wind"]["speed"]);
        setImgUrl(WeatherIconsByDescription[data["weather"][0]["description"]])
      })
    })
    return(
      <>      
        <h2>
          Weather in {location}
        </h2>
        <p>
          Temperature {temp} Celcius
        </p>
        <img src={`https://openweathermap.org/img/wn/${imgUrl}`} alt="weather icon" />
        <p>
          Wind {wind} m/s
        </p>
      </>
    );
}
  
WeatherDetails.propTypes = {
    location: PropTypes.string.isRequired
};

export default WeatherDetails
