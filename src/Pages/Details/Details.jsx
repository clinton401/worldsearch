import React, { useContext, useEffect, useState } from "react";
import { myContext } from "../../App";
import {  useNavigate } from "react-router-dom";
import dc from './Details.module.css'
import DetailsSkeleton from "../../Components/DetailsSkeleton";
import DetailsMain from "../../Components/DetailsMain";
import { useParams } from "react-router-dom";
import { scrollToTop } from "../Home/Home";

function Details() {
  const { fetchData, countryName, setCountryName, lightMode } = useContext(myContext);
  const [detailsActive, setDetailsActive] = useState(false);
  const [detailsSkeletonActive, setDetailsSkeletonActive] = useState(true);
  const [dtNotFound, setDtNotFound] = useState(false)
  const [countryData, setCountryData] = useState([]);
  const [useEffectName, setUseEffectName] = useState('Worldsearch')
  const navigate = useNavigate();
  const { id } = useParams();

useEffect(() => {
  document.title = useEffectName
}, [useEffectName])
  useEffect(() => {
    fetchData();
    
  }, []); // Fetch data when component mounts
 useEffect(() => {
   window.localStorage.setItem("dts", JSON.stringify(countryData));
 }, [countryData]);
  const routeHandler = () => {
    document.title = 'Worldsearch'
    navigate("/");
    scrollToTop()
  };

  const fetchDataDetails = async (code) => {
    const urlToFetch = `https://restcountries.com/v3.1/alpha/${code}`;
    try {
      const response = await fetch(urlToFetch);
      if (response.ok) {
        const jsonResponse = await response.json();
        setCountryData(jsonResponse);
        setUseEffectName(jsonResponse[0].name.common)
        setDetailsActive(true);
        setDetailsSkeletonActive(false);
        setDtNotFound(false);
      } else {
        
        setDetailsActive(false);
        setDetailsSkeletonActive(false);
        setDtNotFound(true)
       
      }
    } catch (error) {
        setDetailsActive(false);
        setDetailsSkeletonActive(false);
        setDtNotFound(true);
      console.log(error);
    }
  };
  useEffect(() => {
    fetchDataDetails(id);
  
  }, [countryName]);


  return (
    <div className={`dt ${!lightMode ? "darkmode" : ""}`}>
     
      <div className={dc.btn_div}>
        {" "}
        <button onClick={routeHandler} id="button">
          <svg
            height="16"
            className="red-svg"
            width="16"
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            viewBox="0 0 1024 1024"
          >
            <path d="M874.690416 495.52477c0 11.2973-9.168824 20.466124-20.466124 20.466124l-604.773963 0 188.083679 188.083679c7.992021 7.992021 7.992021 20.947078 0 28.939099-4.001127 3.990894-9.240455 5.996574-14.46955 5.996574-5.239328 0-10.478655-1.995447-14.479783-5.996574l-223.00912-223.00912c-3.837398-3.837398-5.996574-9.046027-5.996574-14.46955 0-5.433756 2.159176-10.632151 5.996574-14.46955l223.019353-223.029586c7.992021-7.992021 20.957311-7.992021 28.949332 0 7.992021 8.002254 7.992021 20.957311 0 28.949332l-188.073446 188.073446 604.753497 0C865.521592 475.058646 874.690416 484.217237 874.690416 495.52477z"></path>
          </svg>
          <span>Back</span>
        </button>
      </div>

      <section className={dc.dt_section}>
        {detailsActive && (
          <DetailsMain
            theme={lightMode ? "light" : "dark"}
            name={countryData[0].name.common}
            image={countryData[0].flags.svg}
            population={countryData[0].population}
            region={countryData[0].region}
            setCountryName={setCountryName}
            capital={countryData[0].capital}
            sRegion={countryData[0].subregion}
            borders={countryData[0].borders}
            languages={countryData[0].languages}
            currency={countryData[0].area}
            td={countryData[0].tld}
            setDetailsActive={setDetailsActive}
            setDtNotFound={setDtNotFound}
            setDetailsSkeletonActive={setDetailsSkeletonActive}
            setCountryData={setCountryData}
            nName={
              // countryData[0].name.nativeName.eng.official
              //   ? countryData[0].name.nativeName.eng.official
              countryData[0].name.official
            }
            fetchDataDetails={fetchDataDetails}
          />
        )}
        {detailsSkeletonActive && (
          // <h2>boy</h2>
          <DetailsSkeleton theme={lightMode ? "light" : "dark"} />
        )}
      </section>
      {dtNotFound && (
        <section className={`dt_notfound ${!lightMode ? "darkmode" : ""}`}>
          <h2> PAGE NOT FOUND</h2>
          <p>
            The page you are looking for might have been removed 
            had its name changes or is temporary unavailable{" "}
          </p>
        </section>
      )}
    </div>
  );
}

export default Details;
