import React, { useState, useEffect } from "react";
import axios from "axios";
import { kanyeQuoteURL } from "../utils/data-source";
import usePrevious from "../hooks/use-previous";

export const KanyeQuote = () => {
  const [randomQuote, setRandomQuote] = useState({
    quote: `Let's hope for the best`
  });
  const previousQuote = usePrevious(randomQuote.quote);

  useEffect(() => {
    const getRandomQuote = async () => {
      const response = await axios.get(kanyeQuoteURL);
      const data = await response.data.quote;
      setRandomQuote({ quote: data });
    };
    let getQuoteEveryMin = setInterval(() => getRandomQuote(), 10000 * 60);

    return () => clearInterval(getQuoteEveryMin);
  }, []);

  return (
    <>
      <h2>Random Quote:</h2>
      <p> {randomQuote.quote}</p>

      <h2>Previuos Random Quote:</h2>
      <p> {previousQuote}</p>
    </>
  );
};
