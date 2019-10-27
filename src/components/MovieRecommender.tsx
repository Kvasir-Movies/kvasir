import React, { useState } from "react";
import { Button, Form, Header, Segment } from "semantic-ui-react";

import { Movie, User } from "../types";
import { getRecommendation } from "../network/requests";
import UserPicker from "./UserPicker";
import MovieList from "./MovieList";

const MovieRecommender = ({
  sessionUser
}: {
  sessionUser: User;
}): JSX.Element => {
  const [recommendedMovies, setRecommendedMovies] = useState<Array<Movie>>([]);
  const [selectedEmails, setSelectedEmails] = useState<Array<string>>([]);

  const handleFetchMovieRecommendation = async () => {
    const recommendedMovies = await getRecommendation(selectedEmails.join(","));
    setRecommendedMovies(recommendedMovies);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div className="flex-fill">
        <UserPicker
          sessionUser={sessionUser}
          selectedEmails={selectedEmails}
          setSelectedEmails={setSelectedEmails}
        />
        <Button
          onClick={handleFetchMovieRecommendation}
          primary
          style={{ marginLeft: "0.5em" }}
        >
          Find Movies
        </Button>
      </div>

      <Segment.Group>
        {recommendedMovies.map((movie: Movie, index: number) => (
          <Segment key={movie.externalMovieId}>{movie.title}</Segment>
        ))}
      </Segment.Group>
    </div>
  );
};

export default MovieRecommender;
