import React, { createContext, useReducer, useContext } from "react";

const INIT_REDUCER = "INIT_REDUCER";
const StateContext = createContext(null);
const DispatchContext = createContext(null);

const createStore = (reducer, options) => {
  return { reducer, options };
};

const combineReducers = reducers => {
  const finalReducers = Object.keys(reducers)
    .filter(key => typeof reducers[key] === "function")
    .reduce((acc, key) => ({ ...acc, [key]: reducers[key] }), {});

  const finalReducerKeys = Object.keys(finalReducers);
  return (state = {}, action) => {
    let hasChanged = false;
    const nextState = {};
    for (let i = 0; i < finalReducerKeys.length; i++) {
      const key = finalReducerKeys[i];
      const reducer = finalReducers[key];
      const previousStateForKey = state[key];
      const nextStateForKey = reducer(previousStateForKey, action);
      nextState[key] = nextStateForKey;
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
    }
    return hasChanged ? nextState : state;
  };
};

const getInitialState = reducer => reducer(undefined, { type: INIT_REDUCER });

const Provider = ({ children, store, log }) => {
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

const connect = (mapState = state => state, mapActions = {}) => Component => {
  const ReduxConnect = props => {
    const [appState, appActions] = useRedux(mapState, mapActions);
    return <Component {...props} {...appState} {...appActions} />;
  };
  return ReduxConnect;
};

export { createStore, combineReducers, Provider, connect };
