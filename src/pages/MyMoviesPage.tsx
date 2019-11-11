import React from "react";
import { Container, Header } from "semantic-ui-react";

import LayoutContainer from "../components/LayoutContainer";
import MovieAdder from "../components/MovieAdder";
import MovieList from "../components/MovieList";
import { Path, PreferenceType } from "../constants";
import useSessionUser from "../hooks/useSessionUser";
import useUpsertMoviePreference from "../hooks/useUpsertMoviePreferences";
import useUserMovies from "../hooks/useUserMovies";

const MyMoviesPage = (): JSX.Element => {
  const sessionUser = useSessionUser()!;
  const movies = useUserMovies(sessionUser);
  const upsertMoviePreference = useUpsertMoviePreference();

  function handleAddMoviePreference(externalMovieId: string) {
    upsertMoviePreference({
      externalMovieId,
      preferenceType: PreferenceType.positive,
      userId: sessionUser.id
    });
  }

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
          <MovieAdder handleAddMovie={handleAddMoviePreference} />
        </Container>
        <div style={{ marginTop: 20 }}>
          <MovieList movies={movies} />
        </div>
      </div>
    </LayoutContainer>
  );
};

export default MyMoviesPage;
