import React, { useEffect, useState, Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  RouteProps,
  Redirect
} from "react-router-dom";

import "./App.css";
import ReelSpinner from "./components/ReelSpinner";
import { Path } from "./constants";
import ExplorePage from "./pages/ExplorePage";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import MyMoviesPage from "./pages/MyMoviesPage";
import SignupPage from "./pages/SignupPage";
import { User } from "./types";

interface AuthenticationRouteProps extends RouteProps {
  sessionUser: User | null;
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
  const [sessionUser, setSessionUser] = useState<User | null>(null);
  const [hasSessionLoaded, setSessionLoaded] = useState(false);

  useEffect(() => {
    fetch("/session")
      .then(response => response.json())
      .then((data: { user: User | null }) => {
        setSessionUser(data.user);
        setSessionLoaded(true);
      })
      .catch(error => alert("Something went wrong, please refresh the page."));
  }, []);

  return (
    <Router>
      <div className="fill-height">
        {hasSessionLoaded ? (
          <div className="fill-height">
            <UnauthenticatedRoute path="/" exact sessionUser={sessionUser}>
              <LandingPage setSessionUser={setSessionUser} />
            </UnauthenticatedRoute>
            <UnauthenticatedRoute
              path={Path.landingPage}
              sessionUser={sessionUser}
            >
              <LandingPage setSessionUser={setSessionUser} />
            </UnauthenticatedRoute>
            <UnauthenticatedRoute
              path={Path.loginPage}
              sessionUser={sessionUser}
            >
              <LoginPage setSessionUser={setSessionUser} />
            </UnauthenticatedRoute>
            <UnauthenticatedRoute
              path={Path.signupPage}
              sessionUser={sessionUser}
            >
              <SignupPage setSessionUser={setSessionUser} />
            </UnauthenticatedRoute>
            <AuthenticatedRoute
              path={Path.explorePage}
              sessionUser={sessionUser}
            >
              <ExplorePage
                sessionUser={sessionUser!}
                setSessionUser={setSessionUser}
              />
            </AuthenticatedRoute>
            <AuthenticatedRoute
              path={Path.myMoviesPage}
              sessionUser={sessionUser}
            >
              <MyMoviesPage
                sessionUser={sessionUser!}
                setSessionUser={setSessionUser}
              />
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
