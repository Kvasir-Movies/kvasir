import React from "react";
import { Container, Header } from "semantic-ui-react";

import FriendAdder from "../components/FriendAdder";
import FriendList from "../components/FriendList";
import LayoutContainer from "../components/LayoutContainer";
import { Path } from "../constants";
import { AuthenticatedPageProps, User } from "../types";

const FriendsPage = ({
  sessionUser,
  setSessionUser
}: AuthenticatedPageProps): JSX.Element => {
  return (
    <LayoutContainer
      activePath={Path.friendsPage}
      sessionUser={sessionUser}
      setSessionUser={setSessionUser}
    >
      <Container text>
        <Header as="h2">Friends</Header>
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