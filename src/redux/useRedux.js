import { useContext } from "react";
import { StateContext, DispatchContext } from "./";

export default (mapState, mapActions) => {
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
