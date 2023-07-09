import React, { useEffect, useState } from "react";
import Plane from "../Plane/Plane";
import "./Strip.css";

const Strip = ({ number, plane }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(plane ? false : true);
  }, [plane]);

  return (
    <>
      <section className="strips-continer">
        <div className={`strip number${number}`}>
          {number}
          {!open ? (
            <span className="plane-position">
              <Plane strip={number} plane={plane} />
            </span>
          ) : null}
        </div>
      </section>
    </>
  );
};

export default Strip;
