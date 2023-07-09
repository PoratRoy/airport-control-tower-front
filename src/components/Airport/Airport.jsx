import React, { useEffect,useState, useContext } from "react";
import Strip from "../Strip/Strip";
import { SocketContext } from "../../context/socketContext";
import "./Airport.css";

const Airport = () => {
  const [postions, setPostions] = useState(null);
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    setPostions([...Array(8)].map((e, i) => <div key={i}>{<Strip number={i+1} plane={null} />}</div>));
  }, []);

  useEffect(()=>{
    socket.on("newPlaneArrive", (data) => {
      setPostions(getPositions(data));
    });

    socket.on("updateMoves", (data) => {
      setPostions(getPositions(data));
    });
    
  },[socket])

  const getPositions = (strips) => {
    if(strips){
      const res = strips.map((strip, i)=>{
        return <div key={i}>{<Strip number={strip.number} plane={strip.plane} />}</div>
      })
      return res;
    }
  };

  return (
    <>
      <section className="airport-continer">
        {postions}
      </section>
    </>
  );
};

export default Airport;
