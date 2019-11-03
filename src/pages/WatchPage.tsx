import React from "react";
import { useSelector } from "react-redux";
import { Container, Header } from "semantic-ui-react";

import LayoutContainer from "../components/LayoutContainer";
import MovieRecommender from "../components/MovieRecommender";
import { Path } from "../constants";
import { GlobalState } from "../types";

const WatchPage = (): JSX.Element => {
  const sessionUser = useSelector((state: GlobalState) => state.sessionUser!);

  return (
    <LayoutContainer activePath={Path.watchPage}>
      <Container text>
        <Header as="h2">Find a movie to watch with friends</Header>
        <MovieRecommender sessionUser={sessionUser} />
      </Container>
    </LayoutContainer>
  );
};

export default WatchPage;
