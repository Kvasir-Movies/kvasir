import { SET_SESSION_LOADED, SET_SESSION_USER } from "./actions";
import { Action, GlobalState } from "./types";

export default function rootReducer(
  state: GlobalState = {
    hasSessionLoaded: false,
    sessionUser: null
  },
  action: Action
): GlobalState {
  switch (action.type) {
    case SET_SESSION_LOADED:
      return Object.assign({}, state, {
        hasSessionLoaded: action.hasSessionLoaded
      });
    case SET_SESSION_USER:
      return Object.assign({}, state, {
        sessionUser: action.user
      });
    default:
      return state;
  }
}
