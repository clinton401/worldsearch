import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import "./components.css";
export const numberWithCommas = (number) => {
  return number.toLocaleString();
};
function Card({
  name,
  image,
  population,
  region,
  capital,
  theme,
  routeLocation,
  setCountryName,
}) {
  const navigate = useNavigate();
  function routeHandler() {
    navigate(`/country/${routeLocation}`);
  }
  useEffect(() => {
    setCountryName(name);
  }, [name, setCountryName]);

  const realPopulation = numberWithCommas(population);
  return (
    <div className={`card-wrapper skeleton-wrapper ${theme}`}>
      <img src={image} alt={name} aria-label={`${name} flag`} loading="lazy" />
      <div className="skeleton-list-container">
        <h3>{name}</h3>
        <ul className="other-details-list">
          <li>
            <strong>Population: </strong>
            {realPopulation}
          </li>
          <li>
            <strong>Region: </strong>
            {region}
          </li>
          <li>
            <strong>Capital: </strong>
            {capital}
          </li>
        </ul>
        <button id="button" onClick={routeHandler}>
          {" "}
          More details
        </button>
      </div>
    </div>
  );
}

export default Card;
