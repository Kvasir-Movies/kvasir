import React, { useState, useEffect } from "react";

import LayoutContainer from "../components/LayoutContainer";
import { Path } from "../constants";
import { AuthenticatedPageProps } from "../types";

const HomePage = ({
  sessionUser,
  setSessionUser
}: AuthenticatedPageProps): JSX.Element => {
  let hasUserLoaded = false;

  return (
    <LayoutContainer
      activePath={Path.homePage}
      sessionUser={sessionUser}
      setSessionUser={setSessionUser}
    />
  );
};

export default HomePage;
