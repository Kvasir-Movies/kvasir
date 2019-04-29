import React from "react";
import { Container, Header } from "semantic-ui-react";

import LayoutContainer from "../components/LayoutContainer";
import MovieRecommender from "../components/MovieRecommender";
import { Paths } from "../constants";
import { AuthenticatedPageProps, User } from "../types";

const WatchPage = ({
  history,
  sessionUser,
  setSessionUser
}: AuthenticatedPageProps): JSX.Element => {
  return (
    <LayoutContainer
      activePath={Paths.watchPage}
      history={history}
      sessionUser={sessionUser}
      setSessionUser={setSessionUser}
    >
      <Container text>
        <Header as="h1" inverted>
          Find a movie to watch with friends
        </Header>
        <Header as="h3" inverted>
          Find 🎬 with 👫 😄
        </Header>
        <MovieRecommender />
      </Container>
    </LayoutContainer>
  );
};

export default WatchPage;
