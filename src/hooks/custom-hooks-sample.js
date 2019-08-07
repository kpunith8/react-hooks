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
  const isOffline = useOffline();

  if (isOffline) {
    return <div>Sorry, you are offline ...</div>;
  }

  return <div>You are online!</div>;
};

export default AmIOffline;
