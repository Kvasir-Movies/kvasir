import React from "react";

import LayoutContainer from "../components/LayoutContainer";
import { Paths } from "../constants";
import { AuthenticatedPageProps, User } from "../types";

const WatchPage = ({
  history,
  sessionUser,
  setSessionUser
}: AuthenticatedPageProps): JSX.Element => {
  return (
    <LayoutContainer
      activePath={Paths.watchPage}
      history={history}
      sessionUser={sessionUser}
      setSessionUser={setSessionUser}
    >
      <h1>Watch movies</h1>
      <p>Welcome back, {sessionUser.email}!</p>
    </LayoutContainer>
  );
};

export default WatchPage;
