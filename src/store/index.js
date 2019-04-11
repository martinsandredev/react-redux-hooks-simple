import { createStore, combineReducers } from "./../redux";
import todoReducer from "./todo/reducer";

const reducer = combineReducers({
  todo: todoReducer
});
const store = createStore(reducer, { log: true });

export default store;
