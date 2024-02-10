import React from "react";
import "./components.css";

import { useNavigate } from "react-router-dom";
import { numberWithCommas } from "./Card";
import { scrollToTop } from "../Pages/Home/Home";
function DetailsMain({
  theme,
  image,
  name,
  nName,
  population,
  region,
  sRegion,
  capital,
  td,
  currency,
  borders,
  languages,
  setCountryName,
  setDetailsActive,
  setDtNotFound,
  setDetailsSkeletonActive,
  setCountryData,
  fetchDataDetails,
}) {
  const navigate = useNavigate();

  async function fetchNewDetails(countryCode, location) {
    setDetailsActive(false);
    setDetailsSkeletonActive(true);
    setDtNotFound(false)
    navigate(`/country/${location}`);
    fetchDataDetails(countryCode);
    scrollToTop()
   
  }
  function borderHandler() {
    if (!borders) {
      return <p>No border countries</p>;
    } else {
      return borders.map((bd) => {
        return (
          <button
            id="button"
            key={bd}
            onClick={() => {
              fetchNewDetails(bd, bd);
            }}
          >
            <span>{bd}</span>
          </button>
        );
      });
    }
  }
  function languageHandler() {
    const lanArr = [];
    const lanKey = [];
    Object.entries(languages).map(([key, value]) => {
      lanArr.push(`${value},`);
      lanKey.push(key);
    });
    const lan = lanArr.join(" ");
    return lan;
  }
  const realPopulation = numberWithCommas(population);
  return (
    <section className="dmain-section" id='dmain-section'>
      <div className={`dmain-div ${theme}`} id="details-div">
        <img src={image} alt={`${name} flag`} aria-label={`${name} flag`} />
      </div>

      <div className={`dmain-div2 ${theme}`} id="details-div2">
        <h2>{name}</h2>
        <div id="span_c">
          <span id="dtspans" className='dtspan'>
            <ul>
              <li>
                <strong>Native Name: </strong>
                {nName}
              </li>
              <li>
                <strong>Population: </strong>
                {realPopulation}{" "}
              </li>
              <li>
                <strong>Region: </strong>
                {region}
              </li>
              <li>
                <strong>Sub Region: </strong>
                {sRegion}
              </li>
              <li>
                <strong>Capital: </strong>
                {capital}
              </li>
            </ul>
          </span>
          <span id="dtspans">
            <ul>
              <li>
                <strong>Top Level Domain: </strong>
                {td}
              </li>
              <li>
                <strong>Size: </strong>
                {`${currency}km`}
              </li>
              <li>
                <strong>Languages: </strong>
                {languageHandler()}
              </li>
            </ul>
          </span>
        </div>
        <div className="borders">
          <aside>
            <h6>Border Countries: </h6>
          </aside>

          <span className="border-btns">{borderHandler()}</span>
        </div>
      </div>
    </section>
  );
}

export default DetailsMain;
