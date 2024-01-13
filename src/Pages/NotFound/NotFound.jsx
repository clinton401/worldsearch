import React, { useContext,  } from "react";
import { myContext } from "../../App";
import error from "../../assets/oops.png";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate()
  const { lightMode } = useContext(myContext);
  return (
    <section className={`nfound ${!lightMode ? "darkmode" : ""}`} id="nfound">
      <img src={error} alt="404 error image" />
      <h2>404 - PAGE NOT FOUND</h2>
      <p>
        The page you are looking for might have been removed <br />
        had its name changes or is temporary unavailable{" "}
      </p>
      <button id="btn" onClick={() => {
        navigate(`/`)
      }}>GO TO HOMEPAGE</button>
    </section>
  );
}

export default NotFound;
