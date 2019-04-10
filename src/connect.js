import React from "react";
import { useRedux } from "./store";
// import PropTypes from "prop-types";

export default (mapState = state => state, mapActions = {}) => Component => {
  const ReduxConnect = props => {
    const [appState, appActions] = useRedux(mapState, mapActions);
    return <Component {...props} {...appState} {...appActions} />;
  };
  return ReduxConnect;
};
