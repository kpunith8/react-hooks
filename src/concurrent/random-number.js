import React, { useState, useEffect } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

const generateRandomNumber = async () => {
  return new Promise(resolve =>
    setTimeout(() => resolve(Math.random(1000 + 1)), 2000)
  );
};

const RandomNumber = () => {
  const [randomNumber, setRandomNumber] = useState(null);

  useEffect(() => {
    const getRandomNumber = async () => {
      const rn = await generateRandomNumber();
      setRandomNumber(rn);
    };

    getRandomNumber();
  }, []);

  return <div>{randomNumber ? randomNumber : <CircularProgress />}</div>;
};

export default RandomNumber;
