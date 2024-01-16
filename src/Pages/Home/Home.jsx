import React, { useContext, useState, useEffect } from "react";
import { myContext } from "../../App";
import hcss from "./Home.module.css";
import HomeSkeletonList from "../../Components/HomeSkeletonList";
import Card from "../../Components/Card";
import InputSkeleton from "../../Components/InputSkeleton";
import Input from "../../Components/Input";
import ReactPaginate from "react-paginate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight, faArrowRight } from "@fortawesome/free-solid-svg-icons";
function Home() {
  const [noC, setNoC] = useState(false);
  const [newData, setNewData] = useState([]);
  const [itemOffset, setItemOffset] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const itemsPerPage = 35;

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
console.log({show, active, noC})
  useEffect(() => {
    if (data) {
      const endOffset = itemOffset + itemsPerPage;
      setNewData(data.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(data.length / itemsPerPage));
    }
  }, [itemOffset, itemsPerPage, data]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.length;
    setItemOffset(newOffset);
    
  };
  return (
    <main className={`home  ${!lightMode ? "darkmode" : ""}`} id="ho_me">
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
          newData.map((countries) => {
            // Avoid state updates during rendering
            const countryName = countries.name.common;

            return (
              <Card
                name={countryName}
                image={countries.flags.svg}
                population={countries.population}
                region={countries.region}
                capital={countries.capital}
                theme={lightMode ? "light" : "dark"}
                routeLocation={countries.cca3}
                key={countries.name.common}
                setCountryName={() => setCountryName(countryName)}
              />
            );
          })}
        {!active &&
          !noC &&
          num.map((n) => (
            <HomeSkeletonList key={n} theme={lightMode ? "light" : "dark"} />
          ))}
      </section>
      {noC && (
        <section id="not_found">
          <h1>No Country Found</h1>
        </section>
      )}
      {show && active && !noC && (
        <ReactPaginate
          breakLabel="..."
          nextLabel={
            <FontAwesomeIcon icon={faAngleRight} className="paginate-icons" />
          }
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          previousLabel={
            <FontAwesomeIcon icon={faAngleLeft} className="paginate-icons" />
          }
          renderOnZeroPageCount={null}
          containerClassName="pagination"
          pageLinkClassName="page-num"
          previousLinkClassName="page-num"
          nextLinkClassName="page-num"
          activeLinkClassName="actives"
        />
      )}
    </main>
  );
}

export default Home;
