import React, { useState, useEffect } from "react";

import LayoutContainer from "../components/LayoutContainer";
import { Path } from "../constants";
import { AuthenticatedPageProps, Movie, User } from "../types";
import ExploreMovieList from "../components/ExploreMovieList";
import { fetchExploreMovies } from "../network/requests";

import { Container, Header } from "semantic-ui-react";

const ExplorePage = ({
  sessionUser,
  setSessionUser
}: AuthenticatedPageProps): JSX.Element => {
  const [movies, setMovies] = useState<Array<Movie>>([]);
  const doFetchExploreMovies = () => fetchExploreMovies(setMovies);

  return (
    <LayoutContainer
      activePath={Path.explorePage}
      sessionUser={sessionUser}
      setSessionUser={setSessionUser}
      >
        <Header as="h1" textAlign="center">
          Explore
        </Header>
        {user != null && (
          <ExploreMovieList
            user={sessionUser}
            movies={movies}
            fetchExploreMovies={doFetchExploreMovies}
            setMovies={setMovies}
          />
        )}
    </LayoutContainer>
  );
};

export default ExplorePage;
