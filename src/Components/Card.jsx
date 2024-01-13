import React from "react";
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
    setCountryName(name);
  }
  const realPopulation = numberWithCommas(population);
  return (
    <button
      className={`card-wrapper skeleton-wrapper ${theme}`}
      onClick={routeHandler}
    >
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
      </div>
    </button>
  );
}

export default Card;
