import React, { useState, useEffect, SyntheticEvent } from "react";
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

  const options = [
    {
      text: "Popular",
      value: "popularity"
    },
    {
      text: "Trending (Daily)",
      value: "day_trend"
    },
    {
      text: "Trending (Weekly)",
      value: "week_trend"
    }
  ];

  return (
    <LayoutContainer activePath={Path.explorePage}>
      <Dropdown
        as="h3"
        className="movieListHeader"
        options={options}
        defaultValue="popularity"
        onChange={(e, data) => {
          if (data.value) {
            setSortMethod(data.value as string);
          }
        }}
      />
      {sessionUser != null && <MovieList movies={movies} />}
    </LayoutContainer>
  );
};

export default ExplorePage;
