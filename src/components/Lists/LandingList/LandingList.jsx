import React, { useContext, useEffect, useState } from "react";
import { SocketContext } from "../../../context/socketContext";
import "./LandingList.css";

const LandingList = () => {
  const [landings, setLandings] = useState([]);
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    socket.on("updateLandingsList", (data) => {

      const lastTen = data.slice(Math.max(data.length - 5, 0));
      setLandings(lastTen);
    });
  }, [socket]);

  return (
    <>
      <section className="land-continer">
        <div className="land-title">Landing planes</div>
        <ul className="land-list">
          {landings.map((land, i) => (
            <li key={i}>Flight {land.landingPlane.name}</li>
          ))}
        </ul>
      </section>
    </>
  );
};

export default LandingList;
