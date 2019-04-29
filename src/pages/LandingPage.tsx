import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import LayoutContainer from "../components/LayoutContainer";
import { Paths } from "../constants";
import { UnauthenticatedPageProps } from "../types";

const LandingPage = ({
  setSessionUser
}: UnauthenticatedPageProps): JSX.Element => {
  return (
    <LayoutContainer
      activePath={null}
      sessionUser={null}
      setSessionUser={setSessionUser}
    >
      <h1>Try out Reel Politik</h1>
      <Link to={Paths.loginPage}>Log In</Link>
      <Link to={Paths.signupPage}>Sign Up</Link>
    </LayoutContainer>
  );
};

export default LandingPage;
