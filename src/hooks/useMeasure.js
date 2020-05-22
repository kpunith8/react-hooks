import { useState, useLayoutEffect } from "react";

export const useMeasure = (ref, deps) => {
  const [rect, setRect] = useState({});

  useLayoutEffect(() => {
    setRect(ref.current.getBoundingClientRect());
  }, [ref, deps]);

  return rect;
};
