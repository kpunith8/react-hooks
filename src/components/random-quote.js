import React, { useState, useEffect, useRef } from "react";
import { useFetch } from "../hooks/useFetch";
import { useMeasure } from "../hooks/useMeasure";

export const Quote = () => {
  const [quoteNumber, setQuoteNumber] = useState(
    localStorage.getItem("count") || 0
  );

  const divRef = useRef();

  // Using cors-anywhere to avoid network error with fatch
  const url = `https://cors-anywhere.herokuapp.com/http://numbersapi.com/${quoteNumber}/trivia`;
  const quote = useFetch(url);

  const rect = useMeasure(divRef, quote.data);

  // Persist the data in localStorage
  useEffect(() => {
    localStorage.setItem("count", quoteNumber);
  }, [quoteNumber]);

  const onBtnGetQuote = () => {
    const randomQuote = Math.ceil(Math.random() * 100 + 1);

    setQuoteNumber(randomQuote);
  };

  return (
    <div className="data-fetching">
      <p>Data fetching with custom hook</p>
      <button
        style={{ padding: "10px", marginTop: "10px", width: "40%" }}
        onClick={onBtnGetQuote}
      >
        Get Quote
      </button>
      <h2>Quote:</h2>
      <div style={{ display: "flex" }}>
        <div ref={divRef}>
          {quote.loading ? <p>Loading..</p> : <p>{quote.data}</p>}
        </div>
      </div>
      <pre>{JSON.stringify(rect, null, 2)}</pre>
      <p />
    </div>
  );
};
