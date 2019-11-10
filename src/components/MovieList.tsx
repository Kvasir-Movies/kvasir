import React from "react";
import { Card, Responsive, SemanticWIDTHS } from "semantic-ui-react";

import useWindowSize from "../hooks/useWindowSize";
import { Movie } from "../types";
import MovieCard from "./MovieCard";

/**
 * Presentational component to render a list of movies
 */
export default function MovieList(props: {
  movies: Array<Movie>;
}): JSX.Element {
  const windowWidth = useWindowSize().width || 0;
  // NOTE: Another factor is the mobile view which is handled by Card.Group's stackable property.
  const MIN_COLUMNS = 3;
  // When to use more than 3 columns, in px;
  const NEXT_COLUMN_START = Responsive.onlyComputer.minWidth as number;
  const COLUMN_INTERVAL = 250; // add a new column after multiple of this interval, in px
  const numColumns = Math.max(
    MIN_COLUMNS,
    Math.floor(
      (windowWidth - NEXT_COLUMN_START) / COLUMN_INTERVAL + MIN_COLUMNS + 1
    )
  ) as SemanticWIDTHS;

  return (
    <Card.Group
      centered
      stackable
      itemsPerRow={("" + numColumns) as SemanticWIDTHS}
    >
      {props.movies.map((movie, index) => (
        <MovieCard key={index} movie={movie} />
      ))}
    </Card.Group>
  );
}
