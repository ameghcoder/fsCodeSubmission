import PropTypes from "prop-types";

const CountryDetails = ({ name, capital, area, languages, flag }) => {
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
  
CountryDetails.propTypes = {
    name: PropTypes.string.isRequired,
    capital: PropTypes.string.isRequired,
    area: PropTypes.number.isRequired,
    languages: PropTypes.arrayOf(PropTypes.string).isRequired,
    flag: PropTypes.string.isRequired,
};

export default CountryDetails;