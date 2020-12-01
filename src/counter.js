import React, { useEffect, useState } from "react";

const Counter = ({ initialValue = 0, step = 1, buttonColor = 'blue', ...props }) => {
  // console.log(initialValue, props)
  const [count, setCount] = useState(initialValue);

  const onCountChange = () => {
    setCount(count + step);
  };

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCount(count + step);
  //   }, 3 * 1000)

  //   return () => clearInterval(interval)
  // })

  useEffect(() => {
    props.onCounterUpdated(count);
  }, [count]);



  return (
    <div>
      <p>Hello there: {count}</p>
      <button onClick={onCountChange} style={{color: buttonColor}}>Click me: {count}</button>
    </div>
  );
};

export default Counter;
