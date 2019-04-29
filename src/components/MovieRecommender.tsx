import React, { useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";

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
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Form
        onSubmit={handleFetchMovieRecommendation}
        style={{ display: "flex" }}
      >
        <input
          className="flex-fill"
          placeholder="Emails (comma-separated)"
          type="text"
          {...emailsInput}
        />
        <Button
          onClick={handleFetchMovieRecommendation}
          primary
          style={{ marginLeft: "0.5em" }}
        >
          Find Movies
        </Button>
      </Form>
      <Segment.Group>
        {recommendedMovies.map((movie: Movie, index: number) => (
          <Segment key={movie.externalMovieId}>{movie.title}</Segment>
        ))}
      </Segment.Group>
    </div>
  );
};

export default MovieRecommender;
