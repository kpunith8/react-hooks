import React, { useEffect, useState } from "react";

const LocalStorageSample = () => {
  const initialValue = () => Number(window.localStorage.getItem("count"));
  const [count, setCount] = useState(initialValue);
  const increment = () => setCount(count + 1);

  useEffect(() => {
    window.localStorage.setItem("count", count);
  }, [count]); // runs only when the count changes, instead on each render, avoids side effect

  return <button onClick={increment}>{count}</button>;
};

export default LocalStorageSample;
