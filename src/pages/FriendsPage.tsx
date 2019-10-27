import React from "react";

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
      <h1>You have friends</h1>
      <p>Welcome back, {sessionUser.email}!</p>
    </LayoutContainer>
  );
};

export default FriendsPage;
