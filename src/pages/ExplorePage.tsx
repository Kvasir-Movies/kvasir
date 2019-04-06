import React, { useState, useEffect } from "react";

import LayoutContainer from "../components/LayoutContainer";
import { Path } from "../constants";
import { AuthenticatedPageProps, Movie, User } from "../types";
import { fetchExploreMovies } from "../network/requests";

import { Button } from "semantic-ui-react";

const ExplorePage = ({
  sessionUser,
  setSessionUser
}: AuthenticatedPageProps): JSX.Element => {
  const [movies, setMovies] = useState<Array<Movie>>([]);
  const getFetchExploreMovies = () => fetchExploreMovies(setMovies);

  useEffect(getFetchExploreMovies, []);

  return (
    <LayoutContainer
      activePath={Path.explorePage}
      sessionUser={sessionUser}
      setSessionUser={setSessionUser}
      >
      {movies.map((movie, index) => (
        <div>
          <span>
            {movie.title} - {movie.overview}
          </span>
          <img src={movie.poster_path} />
        </div>
      ))}
    </LayoutContainer>
  );
};

export default ExplorePage;
