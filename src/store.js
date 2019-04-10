import { createStore } from "./redux";
import { reducer, initialState } from "./reducer";
export const { Provider, useRedux } = createStore(reducer, initialState);
