import { useRef, useEffect } from "react";

const usePrevious = currentValue => {
  const ref = useRef(null);

  useEffect(() => {
    ref.current = currentValue;
  });

  return ref.current;
};

export default usePrevious;
