import React from "react";
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
import TicTacToe from "./tic-tac-toe/tic-tac-toe";
import ReactQuerySample from "./components/react-query-sample";

import { makeServer } from "./miragejs/server";
import MirageApp from "./miragejs/app";

if (process.env.NODE_ENV === "development") {
  makeServer({ environment: "development" });
}

const App = () => <MirageApp />;

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
