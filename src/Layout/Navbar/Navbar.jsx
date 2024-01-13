import React, { useContext, useState } from 'react'
import ncss from './Navbar.module.css';
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon } from '@fortawesome/free-regular-svg-icons';
import { faMoon as moon } from '@fortawesome/free-solid-svg-icons';
import { myContext } from '../../App';
function Navbar() {
 const {lightMode, setLightMode} = useContext(myContext);

  function modeHandler () {
    setLightMode(!lightMode)
  }
  return (
    <header className={`header ${!lightMode ? "darkmode" : ""}`} id="header">
      <nav>
        <Link to="/">
          {" "}
          <h1>WorldSearch</h1>
        </Link>
      </nav>
      <nav>
        <button onClick={modeHandler}>
          {lightMode ? (
            <FontAwesomeIcon icon={faMoon} className={ncss.famoon} />
          ) : (
            <FontAwesomeIcon icon={moon} className={ncss.moon} />
          )}
          <h4>
            {lightMode ? "Dark" : "Light"} <span>Mode</span>
          </h4>
        </button>
      </nav>
    </header>
  );
}

export default Navbar
