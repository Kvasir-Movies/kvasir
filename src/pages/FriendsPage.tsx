import React from "react";
import { Container, Header } from "semantic-ui-react";

import FriendAdder from "../components/FriendAdder";
import FriendList from "../components/FriendList";
import LayoutContainer from "../components/LayoutContainer";
import { Paths } from "../constants";
import { AuthenticatedPageProps, User } from "../types";

const FriendsPage = ({
  history,
  sessionUser,
  setSessionUser
}: AuthenticatedPageProps): JSX.Element => {
  return (
    <LayoutContainer
      activePath={Paths.friendsPage}
      history={history}
      sessionUser={sessionUser}
      setSessionUser={setSessionUser}
    >
      <Container text>
        <Header as="h1" inverted>
          Friends
        </Header>
        <FriendAdder
          sessionUser={sessionUser}
          setSessionUser={setSessionUser}
        />
        <FriendList sessionUser={sessionUser} />
      </Container>
    </LayoutContainer>
  );
};

export default FriendsPage;
