import React, { useContext, useState } from "react";
import { myContext } from "../../App";
import hcss from "./Home.module.css";
import HomeSkeletonList from "../../Components/HomeSkeletonList";
import Card from "../../Components/Card";
import InputSkeleton from "../../Components/InputSkeleton";
import Input from "../../Components/Input";
function Home() {
 const [noC, setNoC] = useState(false)
  const {
    lightMode,
    data,
    setData,
    show,
    setShow,
    active,
    setActive,
    errors,
    setErrors,
    countryName,
    setCountryName,
  } = useContext(myContext);
  const num = [];
  function numHandler() {
    for (let i = 0; i < 16; i++) {
      num.push(i);
    }
  }
  numHandler();
  return (
    <main className={`home  ${!lightMode ? "darkmode" : ""}`} id='ho_me'>
      <section className={hcss.inputss}>
        {!errors && !show && (
          <InputSkeleton theme={lightMode ? "light" : "dark"} />
        )}
        {errors && show && (
          <Input
            theme={lightMode ? "light" : "dark"}
            setData={setData}
            setActive={setActive}
            setNoC={setNoC}
          />
        )}
      </section>

      <section className={hcss.main_section}>
        {show &&
          active &&
          !noC &&
          data.map((countries) => {
            setCountryName(countries.name.common)
            return (
              <Card
                name={countries.name.common}
                image={countries.flags.svg}
                population={countries.population}
                region={countries.region}
                capital={countries.capital}
                theme={lightMode ? "light" : "dark"}
                routeLocation={countries.cca3}
                key={countries.name.common}
            setCountryName={setCountryName}
            />
          )})}
        {!active && !noC &&
          num.map((n) => (
            <HomeSkeletonList key={n} theme={lightMode ? "light" : "dark"} />
          ))}
      </section>
      {noC && (
        <section id='not_found'>
          <h1>No Country Found</h1>
        </section>
      )}
    </main>
  );
}

export default Home;
