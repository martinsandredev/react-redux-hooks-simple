import React, { useReducer } from "react";
import { StateContext, DispatchContext } from "./";

import { INIT_REDUCER } from "./";
const getInitialState = reducer => reducer(undefined, { type: INIT_REDUCER });

export default ({ children, store, log }) => {
  const { reducer, options } = store;
  const initialState = getInitialState(reducer);
  const [appState, dispatch] = useReducer(reducer, initialState);
  const logAndDispatch = dispatch => action => {
    console.log("Action: ", action);
    return dispatch(action);
  };
  return (
    <StateContext.Provider value={appState}>
      <DispatchContext.Provider
        value={options.log ? logAndDispatch(dispatch) : dispatch}
      >
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
};
