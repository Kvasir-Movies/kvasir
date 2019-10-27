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
      <Container>
        <Header as="h1" textAlign="center">
          Explore
        </Header>
        {sessionUser != null && (
          <ExploreMovieList
            user={sessionUser}
            movies={movies}
            fetchExploreMovies={doFetchExploreMovies}
            setMovies={setMovies}
          />
        )}
      </Container>
    </LayoutContainer>
  );
};

export default ExplorePage;
