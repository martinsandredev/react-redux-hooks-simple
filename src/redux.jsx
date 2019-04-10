import React, { createContext, useReducer, useContext } from "react";

export const createStore = (reducer, initialState) => {
  const StateContext = createContext(null);
  const DispatchContext = createContext(null);

  const Provider = ({ children }) => {
    const [appState, dispatch] = useReducer(reducer, initialState);
    return (
      <StateContext.Provider value={appState}>
        <DispatchContext.Provider value={dispatch}>
          {children}
        </DispatchContext.Provider>
      </StateContext.Provider>
    );
  };

  const useRedux = (mapState, mapActions) => {
    const appState = useContext(StateContext);
    const dispatch = useContext(DispatchContext);
    const mappedState = mapState(appState);
    const mappedActions = Object.keys(mapActions).reduce(
      (acc, key) => ({
        ...acc,
        [key]: (...args) => {
          const action = mapActions[key](...args);
          (typeof action === "function" && action(dispatch, () => appState)) ||
            dispatch(action);
        }
      }),
      {}
    );

    return [mappedState, mappedActions];
  };

  return { Provider, useRedux };
};
