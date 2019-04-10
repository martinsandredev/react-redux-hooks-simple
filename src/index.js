import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "./store";
import Todo from "./Todo";

import "./styles.css";

const App = () => (
  <Provider>
    <div className="App">
      <h1>Todo List com Redux Hooks</h1>
      <Todo />
    </div>
  </Provider>
);

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
