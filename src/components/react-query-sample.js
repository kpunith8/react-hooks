import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { getCookie } from "../utils/helpers";

// const IS_PRODUCTION = process.env.NODE_ENV === "production";
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
  console.log(getCookie("auth-token"));
  const { data } = await axios.get(POSTS_URL, {
    headers: {
      "auth-token": getCookie("auth-token"),
    },
  });

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
      {data?.posts.map((post) => (
        <pre>{JSON.stringify(post, null, 2)}</pre>
      ))}
      <button onClick={getPosts}>Get Posts</button>
    </div>
  );
};

const ReactQuerySample = () => {
  const { data, isError, error, isLoading, refetch } = useQuery(
    "login",
    loginRequest,
    { enabled: false }
  );
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [formValue, setFormValue] = useState({ email: "", password: "" });

  // Set a cookie after the successful login
  useEffect(() => {
    var date = new Date();
    // Expires after 30 mins
    date.setTime(date.getTime() + 30 * 60 * 1000);
    const expires = "expires=" + date.toUTCString();
    document.cookie = `auth-token=${data};${expires};path=/`;
    setIsLoggedIn(true);
  }, [data]);

  const onInputChange = (e) => {
    let updatedFormValue = { ...formValue };
    updatedFormValue[e.target.name] = e.target.value;

    setFormValue(updatedFormValue);
  };

  const onFormSubmit = (e) => {
    e.preventDefault();

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
      <form onSubmit={onFormSubmit}>
        <label>Email:</label>
        <input
          className="filed email"
          type="text"
          value={formValue["email"]}
          name="email"
          onChange={onInputChange}
        />
        <label>Password:</label>
        <input
          className="field password"
          type="password"
          value={formValue["password"]}
          name="password"
          onChange={onInputChange}
        />
        <button type="submit" className="btn-login">
          Login
        </button>
      </form>
      {isLoggedIn ? <Posts loggedIn={isLoggedIn} /> : <div>No Permissions</div>}
    </div>
  );
};

export default ReactQuerySample;
