import React, { useState, useEffect } from "react";

import LayoutContainer from "../components/LayoutContainer";
import { Paths } from "../constants";
import { AuthenticatedPageProps, User } from "../types";

const MyMoviesPage = ({
  history,
  sessionUser,
  setSessionUser
}: AuthenticatedPageProps): JSX.Element => {
  return (
    <LayoutContainer
      activePath={Paths.myMoviesPage}
      history={history}
      sessionUser={sessionUser}
      setSessionUser={setSessionUser}
    >
      <h1>My Movies</h1>
      <p>Welcome back, {sessionUser.email}!</p>
    </LayoutContainer>
  );
};

export default MyMoviesPage;
