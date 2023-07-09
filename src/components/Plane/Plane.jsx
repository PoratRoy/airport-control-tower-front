import React from "react";
import "./Plane.css";


const Plane = ({ strip, plane }) => {

  return (
    <>
    <span
        className={`plane strip${strip} ${plane && plane.position === 0 ? "land" : "of"}`}
      >
        <span className="plane-name">
          {plane && plane.name}
        </span>
      </span>     
    </>
  );
};

export default Plane;


