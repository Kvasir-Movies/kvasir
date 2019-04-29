import React from "react";

import LayoutContainer from "../components/LayoutContainer";
import { Paths } from "../constants";
import { AuthenticatedPageProps, User } from "../types";

const ExplorePage = ({
  history,
  sessionUser,
  setSessionUser
}: AuthenticatedPageProps): JSX.Element => {
  return (
    <LayoutContainer
      activePath={Paths.explorePage}
      history={history}
      sessionUser={sessionUser}
      setSessionUser={setSessionUser}
    >
      <h1>Explore</h1>
    </LayoutContainer>
  );
};

export default ExplorePage;