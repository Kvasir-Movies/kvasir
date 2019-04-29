import React, { useState, useEffect } from "react";

import LayoutContainer from "../components/LayoutContainer";
import MovieAdder from "../components/MovieAdder";
import MovieList from "../components/MovieList";
import MovieRecommender from "../components/MovieRecommender";
import { Paths } from "../constants";
import { fetchMovies } from "../network/requests";
import { MoviePreference, AuthenticatedPageProps, User } from "../types";

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
