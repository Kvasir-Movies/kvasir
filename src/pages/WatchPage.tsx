import React from "react";
import { Container, Header } from "semantic-ui-react";

import LayoutContainer from "../components/LayoutContainer";
import MovieRecommender from "../components/MovieRecommender";
import { Path } from "../constants";

const WatchPage = (): JSX.Element => {
  return (
    <LayoutContainer activePath={Path.watchPage}>
      <Container text>
        <Header as="h2">Find a movie to watch with friends</Header>
        <MovieRecommender />
      </Container>
    </LayoutContainer>
  );
};

export default WatchPage;
