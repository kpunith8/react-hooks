import React, { useState, useEffect } from "react";

// Demonstrates creation of a custom react-hook isOffline which
// checks for network
// Add DOM listeners 'offline' and 'online' in useEffect to register and
// un-regiser on intial render.

const useOffline = () => {
  const [isOffline, setIsOffline] = useState(false);

  const onOffline = () => {
    setIsOffline(true);
  };

  const onOnline = () => {
    setIsOffline(false);
  };

  useEffect(() => {
    window.addEventListener("offline", onOffline);
    window.addEventListener("online", onOnline);

    return () => {
      window.removeEventListener("offline", onOffline);
      window.removeEventListener("online", onOnline);
    };
  }, []); // Pass empty array as second param to load only on initial render

  return isOffline;
};

const AmIOffline = () => {
  const [isOffline] = useState(useOffline());
  const [isOpen, setIsOpen] = useState(() => localStorage.getItem("name"));

  useEffect(() => {
    localStorage.setItem("name", isOpen);
  }, [isOpen]);

  if (isOffline) {
    return <div>Sorry, you are offline ..., </div>;
  }

  const setData = () => setIsOpen(!isOpen);

  return (
    <div>
      <div onClick={setData}>You are online!</div>
      {isOpen ? <p>Ready</p> : <p>Not Ready</p>}
    </div>
  );
};

export default AmIOffline;
