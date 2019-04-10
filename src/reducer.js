export const ActionTypes = {
  ADD: "[App] ADD",
  REMOVE: "[App] REMOVE",
  COMPLETE: "[App] COMPLETE",
  INCOMPLETE: "[App] INCOMPLETE"
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

export const initialState = {
  list: [
    { id: 1, text: "Comprar camiseta", checked: false },
    { id: 2, text: "Jogar futebol", checked: true }
  ]
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD: {
      return {
        ...state,
        list: [
          ...state.list,
          { id: state.list.length + 1, text: action.payload }
        ]
      };
    }

    case ActionTypes.REMOVE: {
      return {
        ...state,
        list: state.list.filter(item => item.id !== action.payload)
      };
    }

    case ActionTypes.COMPLETE: {
      return {
        ...state,
        list: state.list.map(
          item =>
            (item.id === action.payload && { ...item, checked: true }) || item
        )
      };
    }

    case ActionTypes.INCOMPLETE: {
      return {
        ...state,
        list: state.list.map(
          item =>
            (item.id === action.payload && { ...item, checked: false }) || item
        )
      };
    }

    default:
      return state;
  }
};
