import React, { useEffect, useCallback, useState } from "react";
import { useQuery } from "react-query";
import cookie from "cookie";
import axios from "axios";

const IS_PRODUCTION = process.env.NODE_ENV === "production";
const LOGIN_URL = "https://node-mongo-jwt-auth.herokuapp.com/api/user/login";
const POSTS_URL = "https://node-mongo-jwt-auth.herokuapp.com/api/posts";

const loginRequest = async () => {
  const res = await axios.post(LOGIN_URL, {
    email: "kpunith8@gmail.com",
    password: "temp123",
  });
  return await res.data;
};

const getPostsRequest = async () => {
  const cookies = cookie.parse(document.cookie);
  console.log({ cookies });
  const { data } = await axios.get(POSTS_URL, {
    headers: {
      "auth-token": cookies["auth-token"],
    },
  });

  console.log({ data });

  return data;
};

const Posts = () => {
  const { data, isError, error, isLoading, refetch } = useQuery(
    "posts",
    getPostsRequest,
    { enabled: false }
  );

  const getPosts = () => {
    refetch();
  };

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  if (isLoading) {
    return <span>Loading...</span>;
  }

  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <button onClick={getPosts}>Get Posts</button>
    </div>
  );
};

const ReactQuerySample = () => {
  const { data, isError, error, isLoading } = useQuery("login", loginRequest);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Set a cookie after the successful login
  useEffect(() => {
    var date = new Date();
    // Expires after 30 mins
    date.setTime(date.getTime() + 30 * 60 * 1000);
    const expires = "expires=" + date.toUTCString();
    document.cookie = `auth-token=${data};${expires};path=/`;
    setIsLoggedIn(true);
  }, [data]);

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  if (isLoading) {
    return <span>Loading...</span>;
  }

  return (
    <div>
      {isLoggedIn ? <Posts loggedIn={isLoggedIn} /> : <div>No Permissions</div>}
    </div>
  );
};

export default ReactQuerySample;
