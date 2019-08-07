import React, { useState } from "react";
import ReactDOM from "react-dom";

import ItemList from "./hooks/item-list-useState";
import LightIndicator from "./hooks/useEffect-sample";
import AmIOffline from "./hooks/custom-hooks-sample";
import ToDoApp from "./hooks/useReducer-sample";
import LocalStorageSample from "./hooks/hooks-useLocalStorage";

import "./styles.css";

function App() {
  const [count, setCount] = useState(0);

  function updateCounter() {
    setCount(count + 1);
  }

  return (
    <div className="App">
      <p> Punith </p>
      <button onClick={updateCounter}>{count}</button>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<LightIndicator />, rootElement);
