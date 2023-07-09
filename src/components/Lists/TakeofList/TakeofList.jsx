import React, { useContext, useEffect, useState } from "react";
import { SocketContext } from "../../../context/socketContext";
import "./TakeofList.css";

const TakeofList = () => {
  const [takeof, setTakeofs] = useState([]);
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    socket.on("updateTakingofsList", (data) => {
      const lastTen = data.slice(Math.max(data.length - 5, 0));
      setTakeofs(lastTen);
    });
  }, [socket]);

  return (
    <>
      <section className="of-continer">
        <div className="of-title">Taking of planes</div>
        <ul className="of-list">
          {takeof.map((of, i) => (
            <li key={i}>Flight {of.takingofPlane.name}</li>
          ))}
        </ul>
      </section>
    </>
  );
};

export default TakeofList;
