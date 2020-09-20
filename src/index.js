import React, { useState, useCallback } from "react";
import "typeface-roboto";
import ReactDOM from "react-dom";
import ItemList from "./hooks/item-list-useState";
import LightIndicator from "./hooks/useEffect-sample";
import AmIOffline from "./hooks/custom-hooks-sample";
import ToDoApp from "./hooks/useReducer-sample";
import LocalStorageSample from "./hooks/hooks-useLocalStorage";
import LoginForm from "./components/LoginForm";
import UseMemoSample from "./hooks/useMemo-sample";
import { Quote } from "./components/Quote";
import { KanyeQuote } from "./components/KanyeQuote";
import GameOfLife from "./game-of-life/game-of-life";
import TicTacToe from "./tic-tac-toe/tic-tac-toe"
import ReactQuerySample from './components/react-query-sample'

import "./styles.css";

import "./styles.css";

function Counter() {
  const [count, setCount] = useState(0);
  const [height, setHeight] = useState(100);

  const updateCounter = useCallback(() => {
    setCount(count => count + 2);
  }, [setCount]);

  const updateHeight = useCallback(() => {
    setHeight(height => height + 5);
  }, [setHeight]);

  const increment = useCallback(
    times => {
      // Updater functions, no need to pass
      // count or hieght as dependencies for useCallback
      setCount(count => count + times);
      setHeight(height => height + times);
    },
    [setCount, setHeight]
  );

  return (
    <div className="App">
      <h2>React Hooks Samples</h2>
      <Result text={"COUNTER"} value={count} />
      <Button onButtonClick={updateCounter}>{count}</Button>

      <br />
      <br />
      <Result text={"HEIGHT"} value={height} />
      <p>
        adding text content to button re-renders the component though memo used
      </p>
      <Button onButtonClick={updateHeight}>{height}</Button>

      <br />
      <br />
      <Updater increment={increment} />
    </div>
  );
}

// Changes only when the increment function changes
const Updater = React.memo(({ increment }) => {
  useUpdateRenders("Updater");
  return <button onClick={() => increment(5)}>Update</button>;
});

const Button = React.memo(({ onButtonClick, children }) => {
  console.log(`Button rendered: ${children}`);
  return <button onClick={onButtonClick}>{children}</button>;
});

const Result = React.memo(({ text, value }) => {
  console.log(`Rendering ${text}`);
  return (
    <div>
      {text}: {value}
    </div>
  );
});

const useUpdateRenders = () => {
  const renders = React.useRef(0);
  console.log(`Total renders ${renders.current++}`);
};

const App = () => {
  return (
    <div className="app">
      <LoginForm />
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<ReactQuerySample />, rootElement);
