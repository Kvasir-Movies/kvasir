import { Action, User } from "./types";

export const UPDATE_PREFERENCE = "UPDATE_PREFERENCE";
export const SET_SESSION_DATA = "SET_SESSION_DATA";
export const SET_SESSION_USER = "SET_SESSION_USER";

export function setSessionData(
  hasSessionLoaded: boolean,
  user: User | null
): Action {
  return {
    type: SET_SESSION_DATA,
    hasSessionLoaded,
    user
  };
}

export function setSessionUser(user: User | null): Action {
  return {
    type: SET_SESSION_USER,
    user
  };
}
