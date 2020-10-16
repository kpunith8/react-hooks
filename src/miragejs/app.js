import React, { useState, useEffect, useCallback } from "react";
import { useFetch } from "../utils/use-fetch";

export default function App() {
  const [users, setUsers] = useState([]);
  const { data, loading: userLoading, error: userError } = useFetch(
    "/api/users"
  );
  const [name, setName] = useState("");

  useEffect(() => {
    if (data) {
      setUsers(data.users);
    }
  }, [data]);

  const onAddUser = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        const res = await fetch("/api/users", {
          method: "POST",
          body: JSON.stringify({ name }),
        });

        const data = await res.json();
        setUsers((users) => users.concat(data.user));
        setName("");
      } catch (error) {
        throw error;
      }
    },
    [name]
  );

  const onInputChange = useCallback((e) => setName(e.target.value), []);

  return (
    <>
      <form onSubmit={onAddUser}>
        <input type="text" onChange={onInputChange} value={name} />
        <button type="submit">Add User</button>
      </form>
      {userError && <div>{userError.message}</div>}
      <ul>
        {!userLoading &&
          users.map((user) => <li key={user.id}>{user.name}</li>)}
      </ul>
    </>
  );
}
