import React, { useState, useEffect } from "react";
import { Container, Header } from "semantic-ui-react";

import LayoutContainer from "../components/LayoutContainer";
import MovieAdder from "../components/MovieAdder";
import UserMovieList from "../components/UserMovieList";
import { Path } from "../constants";
import { fetchMovies } from "../network/requests";
import { AuthenticatedPageProps, MoviePreference } from "../types";

const MyMoviesPage = ({
  sessionUser,
  setSessionUser
}: AuthenticatedPageProps): JSX.Element => {
  const [movies, setMovies] = useState<Array<MoviePreference>>([]);
  const fetchUserMovies = () => {
    fetchMovies(sessionUser, setMovies);
  };
  useEffect(fetchUserMovies, [sessionUser, setMovies]);

  return (
    <LayoutContainer
      activePath={Path.myMoviesPage}
      sessionUser={sessionUser}
      setSessionUser={setSessionUser}
    >
      <div
        style={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          flexGrow: 1
        }}
      >
        <Container text>
          <Header as="h1" inverted>
            My movies
          </Header>
          <MovieAdder user={sessionUser} fetchUserMovies={fetchUserMovies} />
          <UserMovieList
            user={sessionUser}
            fetchUserMovies={fetchUserMovies}
            movies={movies}
            setMovies={setMovies}
          />
        </Container>
      </div>
    </LayoutContainer>
  );
};

export default MyMoviesPage;
