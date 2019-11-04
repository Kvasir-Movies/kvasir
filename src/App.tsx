import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  RouteProps,
  Redirect
} from "react-router-dom";

import { setSessionData } from "./actions";
import "./App.css";
import "semantic-ui-css/semantic.min.css";
import ReelSpinner from "./components/ReelSpinner";
import { Path } from "./constants";
import useSessionUser from "./hooks/useSessionUser";
import ExplorePage from "./pages/ExplorePage";
import FriendsPage from "./pages/FriendsPage";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import MyMoviesPage from "./pages/MyMoviesPage";
import SignupPage from "./pages/SignupPage";
import WatchPage from "./pages/WatchPage";
import { GlobalState, User } from "./types";

interface AuthenticationRouteProps extends RouteProps {
  sessionUser: User | null;
  children: JSX.Element | Array<JSX.Element>;
}

const AuthenticatedRoute = ({
  children,
  sessionUser,
  ...routeProps
}: AuthenticationRouteProps) => (
  <Route
    {...routeProps}
    render={() =>
      Boolean(sessionUser) ? children : <Redirect to={Path.loginPage} />
    }
  />
);

const UnauthenticatedRoute = ({
  children,
  sessionUser,
  ...routeProps
}: AuthenticationRouteProps) => (
  <Route
    {...routeProps}
    render={() =>
      !sessionUser ? children : <Redirect to={Path.explorePage} />
    }
  />
);

const App = (): JSX.Element => {
  const hasSessionLoaded = useSelector(
    (state: GlobalState) => state.hasSessionLoaded
  );
  const sessionUser = useSessionUser();
  const dispatch = useDispatch();

  useEffect(() => {
    fetch("/session")
      .then(response => response.json())
      .then((data: { user: User | null }) => {
        dispatch(setSessionData(true, data.user));
      })
      .catch(error => alert("Something went wrong, please refresh the page."));
  }, []);

  return (
    <Router>
      <div className="fill-height">
        {hasSessionLoaded ? (
          <div className="fill-height">
            <UnauthenticatedRoute path="/" exact sessionUser={sessionUser}>
              <LandingPage />
            </UnauthenticatedRoute>
            <UnauthenticatedRoute
              path={Path.landingPage}
              sessionUser={sessionUser}
            >
              <LandingPage />
            </UnauthenticatedRoute>
            <UnauthenticatedRoute
              path={Path.loginPage}
              sessionUser={sessionUser}
            >
              <LoginPage />
            </UnauthenticatedRoute>
            <UnauthenticatedRoute
              path={Path.signupPage}
              sessionUser={sessionUser}
            >
              <SignupPage />
            </UnauthenticatedRoute>
            <AuthenticatedRoute
              path={Path.explorePage}
              sessionUser={sessionUser}
            >
              <ExplorePage />
            </AuthenticatedRoute>
            <AuthenticatedRoute path={Path.watchPage} sessionUser={sessionUser}>
              <WatchPage />
            </AuthenticatedRoute>
            <AuthenticatedRoute
              path={Path.myMoviesPage}
              sessionUser={sessionUser}
            >
              <MyMoviesPage />
            </AuthenticatedRoute>
            <AuthenticatedRoute
              path={Path.friendsPage}
              sessionUser={sessionUser}
            >
              <FriendsPage />
            </AuthenticatedRoute>
          </div>
        ) : (
          <div className="full-page-spinner">
            <ReelSpinner />
          </div>
        )}
      </div>
    </Router>
  );
};

export default App;
