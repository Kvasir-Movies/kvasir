import React, { useState } from "react";

import useFormInput from "../hooks/useFormInput";
import { Movie } from "../types";
import { getRecommendations } from "../network/requests";

const MovieRecommender = (props: {}): JSX.Element => {
  const emailsInput = useFormInput("");
  const emails = emailsInput.value;
  const handleChange = emailsInput.handleChange;

  const [recommendedMovies, setRecommendedMovies] = useState<Array<Movie>>([]);
  const handleFetchMovieRecommendations = async () => {
    const recommendedMovies = await getRecommendations(emails);
    setRecommendedMovies(recommendedMovies);
  };

  return (
    <div className="movieRecommender">
      <input
        className="formField"
        type="text"
        value={emails}
        onChange={handleChange}
      />
      <button onClick={handleFetchMovieRecommendations}>Find Movies</button>
      <div className="movieList">
        {recommendedMovies.map((movie: Movie, index: number) => (
          <div className="movieOption" key={index}>
            {movie.title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieRecommender;
