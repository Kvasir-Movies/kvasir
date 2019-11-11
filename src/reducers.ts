import update from "immutability-helper";

import {
  SET_SESSION_DATA,
  SET_SESSION_USER,
  UPSERT_MOVIE_PREFERENCE
} from "./actions";
import { Action, GlobalState, MoviePreference } from "./types";

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
        ...{ hasSessionLoaded: action.hasSessionLoaded! },
        ...{ sessionUser: action.user! }
      };

    case SET_SESSION_USER:
      return {
        ...state,
        ...{ sessionUser: action.user! }
      };

    case UPSERT_MOVIE_PREFERENCE:
      if (!state.sessionUser || !action.moviePreference) {
        return state;
      }

      const newMp = action.moviePreference;
      let newMoviePreferences = [];

      const matchingPreference = state.sessionUser.moviePreferences.find(
        (mp: MoviePreference) =>
          mp.externalMovieId === newMp.externalMovieId &&
          mp.userId === newMp.userId
      );

      if (!matchingPreference) {
        newMoviePreferences = update(state.sessionUser.moviePreferences, {
          $push: [newMp]
        });
      } else {
        newMoviePreferences = update(state.sessionUser.moviePreferences, {
          $apply: (mps: Array<MoviePreference>) =>
            mps.map(
              (mp: MoviePreference) => (mp === matchingPreference ? newMp : mp)
            )
        });
      }

      const newState = update(state, {
        sessionUser: {
          moviePreferences: {
            $set: newMoviePreferences
          }
        }
      });
      return newState;

    default:
      return state;
  }
}
