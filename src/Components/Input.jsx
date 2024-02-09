import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import "./components.css";
import { useNavigate } from "react-router-dom";
import { createRoot } from "react-dom/client";
function Input({ theme, setData, setActive, setNoC }) {
  const [inputValue, setInputValue] = useState("");
  const [selectedValue, setSelectedValue] = useState("all");
  const [inputElements, setInputElements] = useState([]);
  const navigate = useNavigate();
  const newElement = useRef();
  // useEffect(() => {
  //   let increment = -1; // Move the increment variable outside the useEffect
  //   const handleKeyDown = (event) => {
  //     if (event.key === "ArrowDown") {
  //       if (inputElements.length >= 1 && newElement.current) {
  //         const childNodes = newElement.current.childNodes;
  //         if (childNodes.length >= 1) {
  //           const ChildElement = firstChildNode.childNodes;
  //           if (increment < 4) {
  //             // Change condition to prevent out-of-bounds access
  //             increment++;
  //           } else {
  //             increment = 0;
  //           }
  //           ChildElement[increment].focus();
  //           alert(increment);
  //         }
  //       }
  //     }
  //   };

  //   // Add event listener only once
  //   window.addEventListener("keydown", handleKeyDown);

  //   // Remove event listener when the component unmounts
  //   return () => {
  //     window.removeEventListener("keydown", handleKeyDown);
  //   };
  // }, [inputElements, newElement]);

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
                console.log(
                  fc.name.common.toLowerCase().includes(value.toLowerCase())
                );
                // console.log(fc.name.common.toLowerCase());
            return  fc.name.common.toLowerCase().includes(value.toLowerCase())
              }
            );
            console.log(filter2);
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
            const slicedResponse = jsonResponse.slice(0, 5);
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
  }
  useEffect(() => {
          const root = createRoot(newElement.current);

    if (inputElements.length > 0) {
    
        Promise.resolve().then(() => {
        const elements = inputElements.map((inputElement) => {
          const elementName = inputElement.name.common;
                  const elementCountry = inputElement.cca3;

          return (
            <li
              key={elementName}
              onClick={() => liRouteHandler(elementCountry)}
              tabIndex="0"
            >
              {elementName}
            </li>
          );
        });

        root.render(<ul className={`input_elements ${theme}`}>{elements}</ul>);
      });
    }

    // Schedule the unmounting in the next microtask
    return () => {
      if (newElement) {
        Promise.resolve().then(() => {

          // const root = createRoot(newElement.current);
          root.unmount();
        })
      }
    }
  }, [inputElements]);
  useEffect(() => {
    if (newElement) {
      window.addEventListener('click', () => {
                  const root = createRoot(newElement.current);

        //  Promise.resolve().then(() => {
        root.unmount();
        //  });
      
      })
    }
  }, [inputElements])
  async function searchHandler(event) {
    if (newElement) {
      
      //  Promise.resolve().then(() => {
      const root = createRoot(newElement.current);
      root.unmount();
      //  });
    }
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
          {/* <li tabIndex="0">boy</li>
          <li tabIndex="0">boy</li>
          <li tabIndex="0">boy</li> */}
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
