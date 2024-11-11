const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export default {
    API_COUNTRY : "http://localhost:3001/Countries",
    API_COUNTRY_DETAILS : "https://studies.cs.helsinki.fi/restcountries/api/name",
    WEATHER_API : `https://api.openweathermap.org/data/2.5/weather?q={location}&APPID=${WEATHER_API_KEY}`
}