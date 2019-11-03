import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Container, Dropdown, Header } from "semantic-ui-react";

import LayoutContainer from "../components/LayoutContainer";
import { Path } from "../constants";
import { AuthenticatedPageProps, Movie, User, GlobalState } from "../types";
import ExploreMovieList from "../components/ExploreMovieList";
import { fetchExploreMovies } from "../network/requests";

const ExplorePage = (): JSX.Element => {
  const [movies, setMovies] = useState<Array<Movie>>([]);
  const [sortMethod, setSortMethod] = useState("");
  const sessionUser = useSelector((state: GlobalState) => state.sessionUser);
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
      <Header as="h1" textAlign="center">
        Explore
      </Header>
      {sessionUser != null && (
        <ExploreMovieList
          user={sessionUser}
          movies={movies}
          setMovies={setMovies}
        />
      )}
    </LayoutContainer>
  );
};

export default ExplorePage;
