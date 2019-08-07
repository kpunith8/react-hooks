import React, { useState, useEffect } from "react";

const LightIndicator = () => {
  const [isOn, setIsOn] = useState(false);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    let interval;

    if (isOn) {
      // use setTimer(timer => timer + 1) to recieve the latest timer state
      // or update the side-effects when state changes, add timer variable as an
      // argument to second param of the useEffect() function; then code looks setTimer(timer + 1)
      interval = setInterval(() => setTimer(timer + 1), 1000);
    }

    // return statement in the first param to useEffect() will clean up every time DOM updates
    return () => clearInterval(interval);
  }, [isOn, timer]);

  const onReset = () => {
    setIsOn(false);
    setTimer(0);
  };

  return (
    <div>
      {timer}
      <br />
      {!isOn && (
        <button type="button" onClick={() => setIsOn(true)}>
          Start
        </button>
      )}
      {isOn && (
        <button type="button" onClick={() => setIsOn(false)}>
          End
        </button>
      )}

      <button type="button" disabled={timer === 0} onClick={onReset}>
        Reset
      </button>
    </div>
  );
};

export default LightIndicator;
