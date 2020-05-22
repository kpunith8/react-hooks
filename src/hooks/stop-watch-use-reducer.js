import React, { useReducer, useEffect, useRef } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "LAPSE":
      return { ...state, lapse: action.now - action.startTime };
    case "TOGGLE_RUNNING":
      return { ...state, isRunning: !state.isRunning };
    case "CLEAR":
      return { ...state, isRunning: false, lapse: 0 };
    default:
      return state;
  }
}

export default function StopWatchReducer() {
  const intervalRef = useRef(null);
  const [{ isRunning, lapse }, dispatch] = useReducer(reducer, {
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
        dispatch({ type: "LAPSE", now: Date.now(), startTime });
      }, 0);
    }

    dispatch({ type: "TOGGLE_RUNNING" });
  }

  function handleClearClick() {
    clearInterval(intervalRef.current);
    dispatch({ type: "CLEAR" });
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
        style={{ fontSize: "4em", width: "350px" }}
        onClick={handleClearClick}
      >
        CLEAR
      </button>
    </div>
  );
}
