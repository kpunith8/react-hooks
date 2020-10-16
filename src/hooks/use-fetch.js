import { useEffect, useState, useRef } from "react";

export const useFetch = url => {
  const [state, setState] = useState({ data: null, loading: true });
  const isCurrent = useRef(true);
  useEffect(() => {
    return () => {
      isCurrent.current = false;
    };
  }, []);

  useEffect(() => {
    setState({ data: null, loading: true });
    const getData = async () => {
      let quote = await fetch(url);
      let quoteText = await quote.text();

      // If calling component unmounts before the data is
      // fetched, then there is a warning, Can't perform
      // React state update on an unmounted component
      // it may introduce side-effects, to avoid this, useRef to
      // check for current reference
      // Above can be simulated with timeout and unmounting Quote before
      // data returns
      if (isCurrent.current) {
        setState({ data: quoteText, loading: false });
      }
    };

    getData();
  }, [url]);

  return state;
};
