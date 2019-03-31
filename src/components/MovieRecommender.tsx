import React, { useState } from "react";

import useFormInput from "../hooks/useFormInput";
import { Movie } from "../types";
import { getRecommendation } from "../network/requests";

const MovieRecommender = (props: {}): JSX.Element => {
  const emailsInput = useFormInput("");

  const [recommendedMovies, setRecommendedMovies] = useState<Array<Movie>>([]);
  const handleFetchMovieRecommendation = async () => {
    const recommendedMovies = await getRecommendation(emailsInput.value);
    setRecommendedMovies(recommendedMovies);
  };

  return (
    <div className="movieRecommender">
      <input className="formField" type="text" {...emailsInput} />
      <button onClick={handleFetchMovieRecommendation}>Find Movies</button>
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
