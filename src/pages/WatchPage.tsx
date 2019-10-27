import React from "react";
import { Container, Header } from "semantic-ui-react";

import LayoutContainer from "../components/LayoutContainer";
import MovieRecommender from "../components/MovieRecommender";
import { Path } from "../constants";
import { AuthenticatedPageProps, User } from "../types";

const WatchPage = ({
  sessionUser,
  setSessionUser
}: AuthenticatedPageProps): JSX.Element => {
  return (
    <LayoutContainer
      activePath={Path.watchPage}
      sessionUser={sessionUser}
      setSessionUser={setSessionUser}
    >
      <Container text>
        <Header as="h2">Find a movie to watch with friends</Header>
        <MovieRecommender sessionUser={sessionUser} />
      </Container>
    </LayoutContainer>
  );
};

export default WatchPage;
