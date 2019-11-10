import React, { useState } from "react";
import { Button, Form, Header, Segment } from "semantic-ui-react";

import { Movie } from "../types";
import { getRecommendation } from "../network/requests";
import UserPicker from "./UserPicker";
import MovieList from "./MovieList";

const MovieRecommender = (): JSX.Element => {
  const [recommendedMovies, setRecommendedMovies] = useState<Array<Movie>>([]);
  const [selectedEmails, setSelectedEmails] = useState<Array<string>>([]);
  const [fetchCompleted, setFetchCompleted] = useState(false);

  const resetEmails = (emails: Array<string>): void => {
    // clear out recommended movies since selected emails has changed
    setRecommendedMovies([]);
    setFetchCompleted(false);
    setSelectedEmails(emails);
  };

  const handleFetchMovieRecommendation = async () => {
    setFetchCompleted(false);
    setRecommendedMovies([]);
    const recommendedMovies = await getRecommendation(selectedEmails.join(","));
    setFetchCompleted(true);
    setRecommendedMovies(recommendedMovies);
  };

  return (
    <>
      <Header as="h3" inverted>
        Who's watching today?
      </Header>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex" }}>
          <UserPicker
            selectedEmails={selectedEmails}
            setSelectedEmails={resetEmails}
          />
          <Button
            inverted
            onClick={handleFetchMovieRecommendation}
            primary
            disabled={!selectedEmails.length}
          >
            Find Movies
          </Button>
        </div>

        <Header as="h3" inverted>
          Movies in Common
        </Header>
        {selectedEmails.length === 0 &&
          "Search for friends to find movies you all want to watch."}
        {fetchCompleted &&
          selectedEmails.length > 0 &&
          (recommendedMovies.length ? (
            <MovieList movies={recommendedMovies} />
          ) : (
            "No common movies found - try adding more movies to your lists to find ones in common"
          ))}
      </div>
    </>
  );
};

export default MovieRecommender;
