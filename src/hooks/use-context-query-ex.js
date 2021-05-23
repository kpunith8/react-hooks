import React, { useContext, useEffect, useState } from "react";

const EMPTY_ROUTE = { params: {}, query: {} };

const UserContext = React.createContext();

const UserInfo = () => {
  const { route, setRoute } = useContext(UserContext);

  return (
    <>
      <pre>{JSON.stringify(route, null, 2)}</pre>
      <button
        onClick={() =>
          // Try removing the name property on query and see how it re-renders the UI
          setRoute({ params: "1", query: { id: 1, name: "Punith" } })
        }
      >
        New User
      </button>
    </>
  );
};

const UserDetails = () => {
  const [userDetails, setUserDetails] = useState("");

  const { route } = useContext(UserContext);

  // This useEffect can invoke any async call, including calling an websocket
  // so that all the users using this UI will be updated.
  useEffect(() => {
    console.log("set user details");
    // This useEffect() will re-run only if you update route.query.name
    // property in UserInfo's onClick listener. Remove updating "name"
    // property on query key to see the re-rendering in action
    setUserDetails(route.query.name);
  }, [route.query.name]);

  return (
    <>
      <div>{userDetails}</div>
    </>
  );
};

const UseContextSample = (props) => {
  const [route, setRoute] = useState(EMPTY_ROUTE);

  return (
    <UserContext.Provider value={{ route, setRoute }}>
      <UserInfo {...props} />
      <UserDetails />
    </UserContext.Provider>
  );
};

export default UseContextSample;
