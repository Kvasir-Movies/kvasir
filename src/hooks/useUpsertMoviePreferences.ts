import { useDispatch } from "react-redux";

import { upsertMoviePreference as upsertMoviePreferenceAction } from "../actions";
import { upsertMoviePreference as upsertMoviePreferenceRequest } from "../network/requests";
import { MoviePreference } from "../types";

export default function useUpsertMoviePreference() {
  const dispatch = useDispatch();

  async function upsertMoviePreference(mp: MoviePreference) {
    const response = await upsertMoviePreferenceRequest(mp);
    if (response.status !== 200) {
      alert("Failed to update movie preference.");
      return;
    }
    dispatch(upsertMoviePreferenceAction(mp));
  }

  return upsertMoviePreference;
}
