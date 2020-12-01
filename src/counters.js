import React, { useState } from "react";
import Counter from "./counter";

const Counters = () => {
  const [updatedValue, setUpdatedValue] = useState([]);

  const onCounterUpdated = (value) => {
    setUpdatedValue(updatedValue.concat(value));
  };

  return (
    <>
      <Counter initialValue={20} step={5} onCounterUpdated={onCounterUpdated} buttonColor='red'/>
      <Counter initialValue={15} onCounterUpdated={onCounterUpdated} />
      <Counter step={10} onCounterUpdated={onCounterUpdated} buttonColor='green'/>
      <p>
        Updated value:{" "}
        {updatedValue.map((v, k) => (
          <span key={k}>{v},</span>
        ))}
      </p>
    </>
  );
};

export default Counters;
