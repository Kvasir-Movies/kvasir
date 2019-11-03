import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import LayoutContainer from "../components/LayoutContainer";
import { Path } from "../constants";

const LandingPage = (): JSX.Element => {
  return (
    <LayoutContainer>
      <h1>Try out Reel Politik</h1>
      <Link to={Path.loginPage}>Log In</Link>
      <Link to={Path.signupPage}>Sign Up</Link>
    </LayoutContainer>
  );
};

export default LandingPage;
