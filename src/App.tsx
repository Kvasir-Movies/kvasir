import React, { useEffect, useState, Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  RouteProps,
  Redirect
} from "react-router-dom";

import "./App.css";
import ReelSpinner from "./components/ReelSpinner";
import { Paths } from "./constants";
import ExplorePage from "./pages/ExplorePage";
import FriendsPage from "./pages/FriendsPage";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import MyMoviesPage from "./pages/MyMoviesPage";
import SignupPage from "./pages/SignupPage";
import WatchPage from "./pages/WatchPage";
import { User } from "./types";

interface AuthenticationRouteProps extends RouteProps {
  component: React.ComponentType<any>;
  sessionUser: User | null;
  setSessionUser: (user: User | null) => void;
}

const AuthenticatedRoute = ({
  component: Component,
  sessionUser,
  setSessionUser,
  ...rest
}: AuthenticationRouteProps) => (
  <Route
    {...rest}
    render={props =>
      Boolean(sessionUser) ? (
        <Component
          sessionUser={sessionUser}
          setSessionUser={setSessionUser}
          {...props}
        />
      ) : (
        <Redirect to={Paths.loginPage} />
      )
    }
  />
);

const UnauthenticatedRoute = ({
  component: Component,
  sessionUser,
  setSessionUser,
  ...rest
}: AuthenticationRouteProps) => (
  <Route
    {...rest}
    render={props =>
      !sessionUser ? (
        <Component setSessionUser={setSessionUser} {...props} />
      ) : (
        <Redirect to={Paths.explorePage} />
      )
    }
  />
);

const App = (): JSX.Element => {
  const [sessionUser, setSessionUser] = useState<User | null>(null);
  const [hasSessionLoaded, setSessionLoaded] = useState(false);

  useEffect(() => {
    fetch("/session")
      .then(response => response.json())
      .then((data: { user: User | null }) => {
        setSessionUser(data.user);
        setSessionLoaded(true);
      });
  }, []);

  return (
    <Router>
      <div className="flex-fill">
        {hasSessionLoaded ? (
          <div className="flex-fill">
            <UnauthenticatedRoute
              path="/"
              exact
              component={LandingPage}
              sessionUser={sessionUser}
              setSessionUser={setSessionUser}
            />
            <UnauthenticatedRoute
              path={Paths.landingPage}
              component={LandingPage}
              sessionUser={sessionUser}
              setSessionUser={setSessionUser}
            />
            <UnauthenticatedRoute
              path={Paths.loginPage}
              exact
              component={LoginPage}
              sessionUser={sessionUser}
              setSessionUser={setSessionUser}
            />
            <UnauthenticatedRoute
              path={Paths.signupPage}
              exact
              component={SignupPage}
              sessionUser={sessionUser}
              setSessionUser={setSessionUser}
            />
            <AuthenticatedRoute
              path={Paths.explorePage}
              component={ExplorePage}
              sessionUser={sessionUser}
              setSessionUser={setSessionUser}
            />
            <AuthenticatedRoute
              path={Paths.watchPage}
              component={WatchPage}
              sessionUser={sessionUser}
              setSessionUser={setSessionUser}
            />
            <AuthenticatedRoute
              path={Paths.myMoviesPage}
              component={MyMoviesPage}
              sessionUser={sessionUser}
              setSessionUser={setSessionUser}
            />
            <AuthenticatedRoute
              path={Paths.friendsPage}
              component={FriendsPage}
              sessionUser={sessionUser}
              setSessionUser={setSessionUser}
            />
          </div>
        ) : (
          <div className="flex-fill flex-center">
            <ReelSpinner />
          </div>
        )}
      </div>
    </Router>
  );
};

export default App;
