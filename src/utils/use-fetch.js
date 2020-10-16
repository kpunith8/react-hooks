import { useEffect, useState, useRef } from "react";

/**
 * Hook to fetch data from any API end points
 */
export const useFetch = (url) => {
  const [state, setState] = useState({
    data: null,
    loading: true,
    error: null,
  });
  const isCurrent = useRef(true);

  useEffect(() => {
    return () => {
      isCurrent.current = false;
    };
  }, []);

  useEffect(() => {
    setState((state) => ({ ...state, loading: true }));
    const getData = async () => {
      try {
        const res = await fetch(url);
        const data = await res.json();

        // If calling component unmounts before the data is
        // fetched, then there is a warning, "Can't perform
        // React state update on an unmounted component"
        // it may introduce side-effects, to avoid this, useRef to
        // check for current reference.
        if (isCurrent.current) {
          setState((state) => ({
            ...state,
            data,
            loading: false,
            error: null,
          }));
        }
      } catch (error) {
        setState((state) => ({ ...state, error: error }));
      }
    };

    getData();
  }, [url]);

  return state;
};
