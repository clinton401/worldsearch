import React, {  useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import "./components.css";
import { useNavigate } from "react-router-dom";
import { scrollToTop } from "../Pages/Home/Home";
function Input({ theme, setData, setActive, setNoC }) {
  const [inputValue, setInputValue] = useState("");
  const [selectedValue, setSelectedValue] = useState("all");
  const [inputElements, setInputElements] = useState([]);

  const navigate = useNavigate();
  const newElement = useRef();

  const handleInputChange = async (event) => {
    event.preventDefault();
    const value = event.target.value;
    setInputValue(value);
   

    const urlToFetch = `https://restcountries.com/v3.1/name/${value}`;
    if (value.length > 0) {
      if (selectedValue !== "all") {
        try {
          const response = await fetch("https://restcountries.com/v3.1/all");
          if (response.ok) {
            const jsonResponse = await response.json();
            const filteredCountries = jsonResponse.filter((country) =>
              //    console.log(country.region.toLowerCase())
              country.region.toLowerCase().includes(selectedValue.toLowerCase())
            );
            const filter2 = filteredCountries.filter(
              (fc) => {
                 const valueLength = value.length;
                 const fcName = fc.name.common
                   .substring(0, valueLength)
                   .toLowerCase();
                 const substring = value.toLowerCase();
                // console.log(fc.name.common.toLowerCase());
            return fcName === substring;
              }
            );
            
            const slicedResponse = filter2.slice(0, 5);
            setInputElements(slicedResponse);

          } else {
            setInputElements([]);
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          const response = await fetch(urlToFetch);
          if (response.ok) {
            const jsonResponse = await response.json();
             const filter2 = jsonResponse.filter((fc) => {
               const valueLength = value.length;
               const fcName = fc.name.common
                 .substring(0, valueLength)
                 .toLowerCase();
               const substring = value.toLowerCase();
               return fcName === substring;
             });
            const slicedResponse = filter2.slice(0, 5);
            setInputElements(slicedResponse);
          } else {
            setInputElements([]);
          }
        } catch (error) {
          console.log(error);
        }
      }
    } else {
      setInputElements([]);

    }
   
  };
  function liRouteHandler(routeLocation) {
    navigate(`/country/${routeLocation}`);
    scrollToTop()
  }

  useEffect(() => {
  if(inputElements.length > 0 ) {
    window.addEventListener('click', () => {
       setInputElements([]);

 })
  }
}, [inputElements])
  async function searchHandler(event) {
    setInputElements([]);
    event.preventDefault();
    setActive(false);
    const urlToFetch = `https://restcountries.com/v3.1/name/${inputValue}`;

    if (inputValue.length >= 1) {
      if (selectedValue !== "all") {
        try {
          const response = await fetch("https://restcountries.com/v3.1/all");
          if (response.ok) {
            const jsonResponse = await response.json();
            const filteredCountries = jsonResponse.filter((country) =>
              //    console.log(country.region.toLowerCase())
              country.region.toLowerCase().includes(selectedValue.toLowerCase())
            );
            const filter2 = await filteredCountries.filter((fc) =>
              fc.name.common.toLowerCase().includes(inputValue.toLowerCase())
            );
            if (filter2.length === 0) {
              setNoC(true);
            } else {
              setData(filter2);
              setNoC(false);
            }
            console.log();

            setActive(true);
            //    setNoC(false);
          } else {
            setNoC(true);
            setActive(false);
          }
        } catch (error) {
          console.error(error);
        }
      } else {
        try {
          const response = await fetch(urlToFetch);

          if (response.ok) {
            const jsonResponse = await response.json();
            setData(jsonResponse);
            setActive(true);
            setNoC(false); // Reset the "no countries" flag
          } else {
            // If response is not OK, set no countries flag
            setNoC(true);
          }
        } catch (error) {
          console.log(error);
        }
      }
    } else {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");

        if (response.ok) {
          const jsonResponse = await response.json();
          setData(jsonResponse);
          setActive(true);
          setNoC(false); // Reset the "no countries" flag
        } else {
          // If response is not OK, set no countries flag
          setNoC(true);
          setActive(false);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  const handleSelectChange = async (event) => {
    const value = event.target.value;
    setSelectedValue(event.target.value);
    setInputValue("");
    if (value === "all") {
      setActive(false);
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");

        if (response.ok) {
          const jsonResponse = await response.json();
          setData(jsonResponse);
          setActive(true);
          setNoC(false); // Reset the "no countries" flag
        } else {
          // If response is not OK, set no countries flag
          setNoC(true);
          setActive(false);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      setActive(false);
      try {
        const response = await fetch(
          `https://restcountries.com/v3.1/region/${value}`
        );

        if (response.ok) {
          const jsonResponse = await response.json();
          setData(jsonResponse);
          setActive(true);
          setNoC(false); // Reset the "no countries" flag
        } else {
          // If response is not OK, set no countries flag
          setNoC(true);
          setActive(false);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <>
      <div className={`skeleton-list-search ${theme}`} id="sk_search">
        <form onSubmit={searchHandler}>
          <input
            type="text"
            name="search"
            onChange={handleInputChange}
            value={inputValue}
            placeholder="Search for a country..."
          />
          <button type="submit" id="search-btn">
            <FontAwesomeIcon icon={faMagnifyingGlass} id="search" />
          </button>
        </form>
        <ul className={`input_elements ${theme}`} ref={newElement}>
          {inputElements.length > 0 &&
            inputElements.map((inputElement) => {
              const elementName = inputElement.name.common;
              const elementCountry = inputElement.cca3;

              return (
                <li key={elementName}>
                  <button onClick={() => liRouteHandler(elementCountry)} id="l1_btn">
                    {elementName}
                  </button>
                </li>
              );
            })}
        </ul>
      </div>
      <div className={`skeleton-list-filter ${theme}`}>
        <select
          id="mySelect"
          onChange={handleSelectChange}
          defaultValue={selectedValue}
        >
          <option value="all">All</option>
          <option value="africa">Africa</option>
          <option value="america">America</option>
          <option value="asia">Asia</option>
          <option value="europe">Europe</option>
          <option value="oceania">Oceania</option>
        </select>
      </div>
    </>
  );
}
export default Input;
