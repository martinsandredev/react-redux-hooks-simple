export const ActionTypes = {
  ADD: "[Todo] ADD",
  REMOVE: "[Todo] REMOVE",
  COMPLETE: "[Todo] COMPLETE",
  INCOMPLETE: "[Todo] INCOMPLETE"
};

export const actionAdd = text => ({
  type: ActionTypes.ADD,
  payload: text
});

export const actionRemove = id => ({
  type: ActionTypes.REMOVE,
  payload: id
});

export const actionComplete = id => ({
  type: ActionTypes.COMPLETE,
  payload: id
});

export const actionIncomplete = id => ({
  type: ActionTypes.INCOMPLETE,
  payload: id
});
