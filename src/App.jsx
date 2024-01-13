import { createContext, useEffect, useState } from "react";
import Navbar from "./Layout/Navbar/Navbar";
import Routes from "./Routes";

export const myContext = createContext()
function App() {
  const [lightMode, setLightMode] = useState(() => {
    const mode = JSON.parse(window.localStorage.getItem("mode"));
    return mode !== null ? mode : true;

  });
  const [show, setShow] = useState(false);
  const [data, setData] = useState(null);
   const [active, setActive] = useState(false);
   const [errors, setErrors] = useState(false);
   const [countryName, setCountryName] = useState(() => {
     const names = JSON.parse(window.localStorage.getItem("names"));
     return names !== null ? names : '';
   });
  const fetchData = async () => {
    try {
      const response = await fetch('https://restcountries.com/v3.1/all');
      if (response.ok) {
        const jsonResponse = await response.json();
        setData(jsonResponse);
        setShow(true)
        setActive(true);
        setErrors(true);
      }
      else {

        setShow(false);
        setErrors(false);

        setActive(false);
        
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetchData();
  }, [])

  useEffect(() => {
     window.localStorage.setItem("mode", JSON.stringify(lightMode))
   }, [lightMode])
  useEffect(() => {
     window.localStorage.setItem("names", JSON.stringify(countryName))
   }, [countryName])
  const values = {
    lightMode,
    setLightMode,
    data,
    setData,
    show,
    setShow,
    active,
    setActive,
    errors,
    setErrors,
    fetchData,
    countryName,
    setCountryName,
  };
  return (
    <div className={`appp ${!lightMode ? 'darkmode ': ''}`}>
      <myContext.Provider value={values}>
        <Navbar />
        <Routes />
      </myContext.Provider>
    </div>
  );
}

export default App
