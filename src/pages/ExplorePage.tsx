import React, { useState, useEffect } from "react";
import { Dropdown, Header } from "semantic-ui-react";

import LayoutContainer from "../components/LayoutContainer";
import MovieList from "../components/MovieList";
import { Path } from "../constants";
import { Movie } from "../types";
import useSessionUser from "../hooks/useSessionUser";
import { fetchExploreMovies } from "../network/requests";

const ExplorePage = (): JSX.Element => {
  const [movies, setMovies] = useState<Array<Movie>>([]);
  const [sortMethod, setSortMethod] = useState("");
  const sessionUser = useSessionUser();
  const doFetchExploreMovies = (sortMethod: string) =>
    fetchExploreMovies(setMovies, sortMethod);
  useEffect(() => doFetchExploreMovies(sortMethod), [sortMethod]);

  return (
    <LayoutContainer activePath={Path.explorePage}>
      <Dropdown>
        <Dropdown.Menu>
          <Dropdown.Item
            text="Popular"
            onClick={() => setSortMethod("popularity")}
          />
          <Dropdown.Item
            text="Trending (Daily)"
            onClick={() => setSortMethod("day_trend")}
          />
          <Dropdown.Item
            text="Trending (Weekly)"
            onClick={() => setSortMethod("week_trend")}
          />
        </Dropdown.Menu>
      </Dropdown>
      <Header as="h2" textAlign="center">
        Explore
      </Header>
      {sessionUser != null && <MovieList movies={movies} />}
    </LayoutContainer>
  );
};

export default ExplorePage;
