import { ActionTypes } from "./actions";
import { initialState } from "./state";

export default (state = initialState, action) => {
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
