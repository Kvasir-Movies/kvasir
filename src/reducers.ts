import { SET_SESSION_DATA, SET_SESSION_USER } from "./actions";
import { Action, GlobalState } from "./types";

const defaultState = {
  hasSessionLoaded: false,
  sessionUser: null
};

export default function rootReducer(
  state: GlobalState = defaultState,
  action: Action
): GlobalState {
  switch (action.type) {
    case SET_SESSION_DATA:
      return {
        ...state,
        ...{ hasSessionLoaded: action.hasSessionLoaded! }
      };
    case SET_SESSION_USER:
      return {
        ...state,
        ...{ sessionUser: action.user! }
      };
    default:
      return state;
  }
}
