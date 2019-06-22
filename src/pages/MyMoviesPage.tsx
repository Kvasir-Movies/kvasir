import React, { useState, useEffect } from "react";

import LayoutContainer from "../components/LayoutContainer";
import { Path } from "../constants";
import { AuthenticatedPageProps, User } from "../types";

const MyMoviesPage = ({
  sessionUser,
  setSessionUser
}: AuthenticatedPageProps): JSX.Element => {
  return (
    <LayoutContainer
      activePath={Path.myMoviesPage}
      sessionUser={sessionUser}
      setSessionUser={setSessionUser}
    >
      <h1>Reel Politik</h1>
      <p>Welcome back, {sessionUser.email}!</p>
    </LayoutContainer>
  );
};

export default MyMoviesPage;
