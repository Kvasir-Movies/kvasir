import React from "react";

import { PreferenceType } from "../types";

export default function MoviePreferenceType({
  id,
  preference
}: {
  id: number;
  preference: PreferenceType;
}): JSX.Element {
  if (preference == PreferenceType.positive) {
    return <div>👍</div>;
  } else {
    return <div>👎</div>;
  }
}
