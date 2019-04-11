import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "./redux";
import store from "./store";
import { Todo } from "./components";

import "./styles.css";

const App = () => (
  <Provider store={store}>
    <div className="App">
      <h1>Todo List com Redux Hooks</h1>
      <Todo />
    </div>
  </Provider>
);

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
