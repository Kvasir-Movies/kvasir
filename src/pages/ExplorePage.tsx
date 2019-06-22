import React from "react";

import LayoutContainer from "../components/LayoutContainer";
import { Path } from "../constants";
import { AuthenticatedPageProps, User } from "../types";

const ExplorePage = ({
  sessionUser,
  setSessionUser
}: AuthenticatedPageProps): JSX.Element => {
  console.log(sessionUser);
  return (
    <LayoutContainer
      activePath={Path.explorePage}
      sessionUser={sessionUser}
      setSessionUser={setSessionUser}
    >
      <h1>Explore</h1>
    </LayoutContainer>
  );
};

export default ExplorePage;
