import React from "react";
import { useSelector } from "react-redux";
import { Container, Header } from "semantic-ui-react";

import LayoutContainer from "../components/LayoutContainer";
import MovieAdder from "../components/MovieAdder";
import MovieList from "../components/MovieList";
import { Path } from "../constants";
import useUserMovies from "../hooks/useUserMovies";
import { GlobalState } from "../types";

const MyMoviesPage = (): JSX.Element => {
  const sessionUser = useSelector((state: GlobalState) => state.sessionUser!);
  const {
    userMovies,
    handleChangeMoviePreference,
    refetchUserMovies
  } = useUserMovies(sessionUser);

  return (
    <LayoutContainer activePath={Path.myMoviesPage}>
      <div
        style={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          flexGrow: 1
        }}
      >
        <Container text>
          <Header as="h2">My movies</Header>
          <MovieAdder user={sessionUser} fetchUserMovies={refetchUserMovies} />
        </Container>
        <div style={{ marginTop: 20 }}>
          <MovieList
            movies={userMovies}
            changeMoviePreference={handleChangeMoviePreference}
          />
        </div>
      </div>
    </LayoutContainer>
  );
};

export default MyMoviesPage;
