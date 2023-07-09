import React, { useContext, useEffect, useState } from "react";
import { SocketContext } from "../../../context/socketContext";
import "./ScheduleList.css";

const ScheduleList = () => {
  const [data, setData] = useState([]);
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    socket.on("updateScheduleList", (data) => {
      const lastTen = data.slice(Math.max(data.length - 5, 0));
      setData(lastTen);
    });
  }, [socket]);

  return (
    <>
      <section className="data-continer">
        <div className="data-title">Flights Data</div>
        <ul className="data-list">
          {data.map((d, i) => (
            <li key={i}>
              Flight {d.plane.name} {d.strip && d.strip.number}{" "}
              {new Date(d.enterTime).toLocaleTimeString("en-US")}{" "}
              {d.outTime && `-- ${new Date(d.outTime).toLocaleTimeString("en-US")}`}
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};

export default ScheduleList;
