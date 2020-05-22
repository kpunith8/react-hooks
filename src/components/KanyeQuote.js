import React, { useState, useEffect } from "react";
import axios from "axios";
import { kanyeQuoteURL } from "../utils/data-source";

export const KanyeQuote = () => {
  const [randomQuote, setRandomQuote] = useState({ quote: null });
  useEffect(() => {
    const getRandomQuote = async () => {
      const response = await axios.get(kanyeQuoteURL);
      const data = await response.data.quote;
      setRandomQuote({ quote: data });
    };

    getRandomQuote();
  }, []);

  return (
    <>
      <p> {randomQuote.quote}</p>
    </>
  );
};
