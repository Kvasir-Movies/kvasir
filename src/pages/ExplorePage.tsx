import React, { useState, useEffect } from "react";

import ExploreMovieList from "../components/ExploreMovieList";

import { Movie, User } from "../types";
import { fetchExploreMovies } from "../network/requests";

import { Container, Header } from "semantic-ui-react";

const ExplorePage = (): JSX.Element => {
  const [user, setUser] = useState<User | null>(null);
  const [movies, setMovies] = useState<Array<Movie>>([]);
  const doFetchExploreMovies = () => fetchExploreMovies(setMovies);

  useEffect(() => {
    fetch("/session")
      .then(response => response.json())
      .then((data: { user: User | null }) => {
        setUser(data.user);
      });
  }, []);

  return (
    <Container>
      <Header as="h1" textAlign="center">
        Explore
      </Header>
      {user != null && (
        <ExploreMovieList
          user={user}
          movies={movies}
          fetchExploreMovies={doFetchExploreMovies}
          setMovies={setMovies}
        />
      )}
    </Container>
  );
};

export default ExplorePage;
