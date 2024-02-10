import React, { useContext, useState, useEffect } from "react";
import { myContext } from "../../App";
import hcss from "./Home.module.css";
import HomeSkeletonList from "../../Components/HomeSkeletonList";
import Card from "../../Components/Card";
import InputSkeleton from "../../Components/InputSkeleton";
import Input from "../../Components/Input";
import ReactPaginate from "react-paginate";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
const rightAnimation = {
  hidden: {
    x: 500,
    opacity: 0,
  },
  visible: {
    x: "0",
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};
export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};
function Home() {
  const [noC, setNoC] = useState(false);
  const [newData, setNewData] = useState([]);
  const [itemOffset, setItemOffset] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [backToTop, setBackToTop] = useState(false);
  const itemsPerPage = 30;
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
  const handleScroll = () => {
    const scrollY = window.scrollY;

    // Set the visibility based on the scroll position
    setBackToTop(scrollY > 100);
  };

  // Attach scroll event listener when the component mounts
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Function to scroll to the top when the button is clicked
  
  useEffect(() => {
    if (data) {
      const endOffset = itemOffset + itemsPerPage;
      if (data.length < itemOffset) {
        setItemOffset(0)
      }
      
      setNewData(data.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(data.length / itemsPerPage));
    }
  }, [itemOffset, itemsPerPage, data]);
 
  const handlePageClick = (event) => {
    // setActive(false)
    // setTimeout(() => {
    scrollToTop();
       const newOffset = (event.selected * itemsPerPage) % data.length;

       setItemOffset(newOffset);
       
    // }, 1000);
   
    
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
      {backToTop && (
        <motion.span
          className={`scroll-btn ${backToTop ? "acti" : ""}`}
          onClick={scrollToTop}
          variants={rightAnimation}
          initial="hidden"
          animate="visible"
        >
          <button className="butt">
            <svg className="svgIcon" viewBox="0 0 384 512">
              <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"></path>
            </svg>
          </button>
        </motion.span>
      )}
    </main>
  );
}

export default Home;
