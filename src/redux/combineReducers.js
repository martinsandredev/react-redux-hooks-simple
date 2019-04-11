export default reducers => {
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
