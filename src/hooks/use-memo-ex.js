import React, { useState, useCallback } from "react";
import StopWatch from "./stop-watch-set-state";

// memo is used to avoid the unneccesary renders, it can only be used with function components
const UpperCase = React.memo(function UpperCase({ children }) {
  // const [count, setCount] = useState(0);
  console.log("Rendering", children); // try without memo()

  return (
    <div>
      {children}
      {/* {children.toUpperCase()} */}
      {/* <button onClick={() => setCount(count + 1)}>{count}</button> */}
    </div>
  );
});

export default function MemoHookEx() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  // Passing callback to another component
  const setNameCallBack = useCallback(name => {
    setFirstName(name);
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <label htmlFor="first-name-input">First Name: </label>
      <input
        id="first-name-input"
        onChange={e => setFirstName(e.target.value)}
      />
      <UpperCase>{firstName}</UpperCase>
      <br />
      <label htmlFor="last-name-input">Last Name: </label>
      <input id="last-name-input" onChange={e => setLastName(e.target.value)} />
      <UpperCase>{lastName}</UpperCase>
      <StopWatch setName={setNameCallBack} />
    </div>
  );
}
