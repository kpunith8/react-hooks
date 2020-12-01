import React, { useState, useEffect, useCallback } from "react";
import { useFetch } from "../utils/use-fetch";

export default function App() {
  const [users, setUsers] = useState([]);
  const { data, loading: userLoading, error: userError } = useFetch(
    "/api/users"
  );
  const [name, setName] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (data) {
      setUsers(data.users);
    }
  }, [data]);

  const onAddUser = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        setIsUpdating(true);
        const res = await fetch("/api/users", {
          method: "POST",
          body: JSON.stringify({ name }),
        });

        const data = await res.json();
        setUsers((users) => users.concat(data.user));
        setIsUpdating(false);
        setName("");
      } catch (error) {
        throw error;
      }
    },
    [name]
  );

  return (
    <>
      <form onSubmit={onAddUser}>
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <button type="submit" disabled={isUpdating}>
          {isUpdating ? "Updating..." : "Add User"}
        </button>
      </form>
      {userError && <div>{userError.message}</div>}
      <ul>
        {!userLoading &&
          users.map((user) => <li key={user.id}>{user.name}</li>)}
      </ul>
    </>
  );
}
