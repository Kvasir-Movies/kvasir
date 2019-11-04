import { useSelector } from "react-redux";

import { GlobalState } from "../types";

export default function useSessionUser() {
  return useSelector((state: GlobalState) => state.sessionUser);
}
