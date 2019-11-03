import { User } from "./types";

export const UPDATE_PREFERENCE = "UPDATE_PREFERENCE";
export const SET_SESSION_LOADED = "SET_SESSION_LOADED";
export const SET_SESSION_USER = "SET_SESSION_USER";

export function setSessionLoaded(hasSessionLoaded: boolean) {
  return {
    type: SET_SESSION_LOADED,
    hasSessionLoaded
  };
}
export function setSessionUser(user: User | null) {
  return {
    type: SET_SESSION_USER,
    user
  };
}
