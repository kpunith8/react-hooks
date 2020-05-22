import React, { useReducer, useEffect, useRef } from "react";

function reducer(currentState, newState) {
  return { ...currentState, ...newState };
}

// Custom hook to share the same logic between similar components
// Should follow the same name convention to avoid lint error
function useStopWatch() {
  const intervalRef = useRef(null);
  const [{ isRunning, lapse }, setState] = useReducer(reducer, {
    lapse: 0,
    isRunning: false
  });

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  function handleStartClick() {
    if (isRunning) {
      clearInterval(intervalRef.current);
    } else {
      const startTime = Date.now() - lapse;
      intervalRef.current = setInterval(() => {
        setState({ lapse: Date.now() - startTime });
      }, 100);
    }

    setState({ isRunning: !isRunning });
  }

  function handleClearClick() {
    clearInterval(intervalRef.current);
    setState({ lapse: 0, isRunning: false });
  }

  return { handleClearClick, handleStartClick, lapse, isRunning };
}

export default function StopWatchReducerSetState() {
  const stopWatchOne = useStopWatch();
  const stopWatchTwo = useStopWatch();

  return (
    <div style={{ textAlign: "center" }}>
      <label style={{ fontSize: "5em", display: "block" }}>
        {stopWatchOne.lapse}ms
      </label>

      <button
        style={{ fontSize: "4em", width: "350px" }}
        onClick={stopWatchOne.handleStartClick}
      >
        {stopWatchOne.isRunning ? "STOP" : "START"}
      </button>

      <br />
      <br />

      <button
        style={{ fontSize: "4em", width: "350px" }}
        onClick={stopWatchOne.handleClearClick}
      >
        CLEAR
      </button>

      <br />
      <br />
      <strong style={{ fontSize: "2em", color: "green" }}>
        {" "}
        Lapse Difference:{" "}
      </strong>
      <span style={{ fontSize: "2em", color: "red" }}>
        {stopWatchOne.lapse - stopWatchTwo.lapse}ms
      </span>
      <br />

      <label style={{ fontSize: "5em", display: "block" }}>
        {stopWatchTwo.lapse}ms
      </label>

      <button
        style={{ fontSize: "4em", width: "350px" }}
        onClick={stopWatchTwo.handleStartClick}
      >
        {stopWatchTwo.isRunning ? "STOP" : "START"}
      </button>

      <br />
      <br />

      <button
        style={{ fontSize: "4em", width: "350px" }}
        onClick={stopWatchTwo.handleClearClick}
      >
        CLEAR
      </button>
    </div>
  );
}
