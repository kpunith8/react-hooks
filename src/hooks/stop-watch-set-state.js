import React, { useState, useEffect, useRef } from "react";

export default function StopWatch({ setName }) {
  const intervalRef = useRef(null);

  // Refer StopWatchReducer, written using reducer, redux like state management
  const [lapse, setLapse] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  function handleStartClick() {
    if (isRunning) {
      clearInterval(intervalRef.current);
    } else {
      const startTime = Date.now() - lapse;
      intervalRef.current = setInterval(() => {
        setLapse(Date.now() - startTime);
      }, 0);
    }
    setName(lapse);
    setIsRunning(!isRunning);
  }

  function handleClearClick() {
    clearInterval(intervalRef.current);
    setLapse(0);
    setIsRunning(false);
  }

  return (
    <div style={{ textAlign: "center" }}>
      <label style={{ fontSize: "5em", display: "block" }}>{lapse}ms</label>

      <button
        style={{ fontSize: "4em", width: "350px" }}
        onClick={handleStartClick}
      >
        {isRunning ? "STOP" : "START"}
      </button>

      <br />
      <br />

      <button
        className="btn-clear"
        style={{ fontSize: "4em", width: "350px" }}
        onClick={handleClearClick}
      >
        CLEAR
      </button>
    </div>
  );
}
