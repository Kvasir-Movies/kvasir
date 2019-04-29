import React, { useState, useEffect } from "react";

import LayoutContainer from "../components/LayoutContainer";
import { Paths } from "../constants";
import { AuthenticatedPageProps } from "../types";

const HomePage = ({
  sessionUser,
  setSessionUser
}: AuthenticatedPageProps): JSX.Element => {
  let hasUserLoaded = false;

  return (
    <LayoutContainer
      activePath={Paths.homePage}
      sessionUser={sessionUser}
      setSessionUser={setSessionUser}
    />
  );
};

export default HomePage;
