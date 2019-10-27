import React from "react";

import LayoutContainer from "../components/LayoutContainer";
import { Path } from "../constants";
import { AuthenticatedPageProps, User } from "../types";

const WatchPage = ({
  sessionUser,
  setSessionUser
}: AuthenticatedPageProps): JSX.Element => {
  return (
    <LayoutContainer
      activePath={Path.watchPage}
      sessionUser={sessionUser}
      setSessionUser={setSessionUser}
    >
      <h1>Watch movies</h1>
      <p>Welcome back, {sessionUser.email}!</p>
    </LayoutContainer>
  );
};

export default WatchPage;
