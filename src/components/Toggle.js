import React, { useEffect } from "react";

export const Toggle = () => {
  useEffect(() => {
    console.log("Toggle component mouted");

    return () => {
      console.log("Toggle component unmounted");
    };
  }, []);

  return (
    <>
      <div>useEffect cleanup and dependencies</div>
    </>
  );
};
