import React, { useReducer, useState, useEffect } from "react";
import uuid from "uuid/v4";

const initialTodos = JSON.parse(localStorage.getItem("todos")) || [];

const todoReducer = (state, action) => {
  switch (action.type) {
    case "DO_TODO":
      return state.map(todo => {
        if (todo.id === action.id) {
          return { ...todo, complete: true };
        } else {
          return todo;
        }
      });

    case "UNDO_TODO":
      return state.map(todo => {
        if (todo.id === action.id) {
          return { ...todo, complete: false };
        } else {
          return todo;
        }
      });

    case "ADD_ITEM": {
      return [...state, action.payload];
    }

    default:
      return state;
  }
};

const ToDoApp = () => {
  const [todos, dispatch] = useReducer(todoReducer, initialTodos);
  const [itemName, setItemName] = useState("");

  const handleCheckState = todo => {
    dispatch({ type: todo.complete ? "UNDO_TODO" : "DO_TODO", id: todo.id });
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const onItemAdded = e => {
    e.preventDefault();

    if (itemName.length > 0) {
      dispatch({
        type: "ADD_ITEM",
        payload: { id: uuid(), task: itemName.trim(), complete: false }
      });

      setItemName("");
    }
  };

  const onItemChange = e => {
    e.preventDefault();

    setItemName(e.target.value);
  };

  return (
    <>
      <h2>Simple Todo App with useReducer</h2>
      <form onSubmit={onItemAdded}>
        <label>Item Name</label>
        <br />
        <input type="text" value={itemName} onChange={onItemChange} />
        <br />
        <button type="submit">Add Item</button>
      </form>

      {todos.length > 0 ? (
        <p>Items are:</p>
      ) : (
        <p>No Items in Todo, Please add one!</p>
      )}
      <ul style={{ padding: "0px", listStyle: "none", marginLeft: "0px" }}>
        {todos.map(todo => (
          <li
            key={todo.id}
            style={{
              textDecoration: todo.complete ? "line-through" : "",
              marginTop: "5px"
            }}
          >
            <input
              type="checkbox"
              checked={todo.complete}
              onChange={() => handleCheckState(todo)}
            />
            <label style={{ marginLeft: "3px" }}>{todo.task}</label>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ToDoApp;
