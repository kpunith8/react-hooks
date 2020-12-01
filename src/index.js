import React from "react";
import "typeface-roboto";
import ReactDOM from "react-dom";
import ItemList from "./hooks/item-list-use-state";
import LightIndicator from "./hooks/use-effect-sample";
import AmIOffline from "./hooks/custom-hook-is-offline";
import ToDoApp from "./hooks/use-reducer-sample";
import LocalStorageSample from "./hooks/hooks-use-local-storage";
import LoginForm from "./components/login-form";
import UseMemoSample from "./hooks/use-memo-sample";
import { Quote } from "./components/random-quote";
import { KanyeQuote } from "./components/kanye-quote";
import GameOfLife from "./game-of-life/game-of-life";
import TicTacToe from "./tic-tac-toe/tic-tac-toe";
import ReactQuerySample from "./components/react-query-sample";
import Counters from './counters'

import { makeServer } from "./miragejs/server";
import MirageApp from "./miragejs/mirage-ex";

if (process.env.NODE_ENV === "development") {
  makeServer({ environment: "development" });
}

const App = () => <MirageApp />;

const rootElement = document.getElementById("root");
ReactDOM.render(<Counters />, rootElement);
