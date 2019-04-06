import React, { useState, useEffect } from "react";

import { Movie } from "../types";
import { fetchExploreMovies } from "../network/requests";

import { Button } from "semantic-ui-react";

const ExplorePage = (): JSX.Element => {
  const [movies, setMovies] = useState<Array<Movie>>([]);
  const getFetchExploreMovies = () => fetchExploreMovies(setMovies);

  useEffect(getFetchExploreMovies, []);

  return (
    <div>
      {movies.map((movie, index) => (
        <div>
          <span>
            {movie.title} - {movie.overview}
          </span>
          <img src={movie.poster_path} />
        </div>
      ))}
    </div>
  );
};

export default ExplorePage;
