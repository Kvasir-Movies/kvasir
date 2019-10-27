import React from "react";
import { Container, Header } from "semantic-ui-react";

import LayoutContainer from "../components/LayoutContainer";
import MovieAdder from "../components/MovieAdder";
import { Path } from "../constants";
import { AuthenticatedPageProps } from "../types";
import useUserMovies from "../hooks/useUserMovies";
import MovieList from "../components/MovieList";

const MyMoviesPage = ({
  sessionUser,
  setSessionUser
}: AuthenticatedPageProps): JSX.Element => {
  const {
    userMovies,
    handleChangeMoviePreference,
    refetchUserMovies
  } = useUserMovies(sessionUser);

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
          <Header as="h2">My movies</Header>
          <MovieAdder user={sessionUser} fetchUserMovies={refetchUserMovies} />
          <div style={{ marginTop: 20 }}>
            <MovieList
              movies={userMovies}
              changeMoviePreference={handleChangeMoviePreference}
            />
          </div>
        </Container>
      </div>
    </LayoutContainer>
  );
};

export default MyMoviesPage;
