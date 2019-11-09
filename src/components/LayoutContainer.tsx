import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  Container,
  Icon,
  Image,
  Menu,
  Responsive,
  Sidebar,
  Button
} from "semantic-ui-react";

import { setSessionUser } from "../actions";
import { Path } from "../constants";
import useSessionUser from "../hooks/useSessionUser";
import logo from "../images/reel-politik-logo-1.png";

const Logo = () => <Image className="logo" src={logo} />;

const NavBar: React.SFC<{ mobile?: boolean }> = ({
  children,
  mobile
}): JSX.Element => (
  <div className={`navbar ${mobile ? "mobile" : "desktop"}`}>{children}</div>
);

const PageMenuItem = ({
  activePath,
  pageName,
  pagePath
}: {
  activePath?: Path;
  pageName: string;
  pagePath: Path;
}): JSX.Element => {
  const history = useHistory();
  return (
    <Menu.Item
      active={activePath == pagePath}
      key={pagePath}
      onClick={() => {
        history.push(pagePath);
      }}
    >
      {pageName}
    </Menu.Item>
  );
};

const LayoutContainer: React.SFC<{
  activePath?: Path;
}> = ({ activePath, children }): JSX.Element => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sessionUser = useSessionUser();
  const dispatch = useDispatch();

  function handleSidebarHide() {
    setSidebarOpen(false);
  }
  function handleToggle() {
    setSidebarOpen(!sidebarOpen);
  }

  const handleLogout = () => {
    fetch("/logout", { method: "POST" }).then(response => {
      if (response.ok) {
        dispatch(setSessionUser(null));
      }
    });
  };

  const LogoutButton = () => (
    <Button basic inverted onClick={handleLogout}>
      Log Out
    </Button>
  );

  const pageMenuItems = [
    <PageMenuItem
      activePath={activePath}
      key={Path.explorePage}
      pageName="Explore"
      pagePath={Path.explorePage}
    />,
    <PageMenuItem
      activePath={activePath}
      key={Path.watchPage}
      pageName="Watch"
      pagePath={Path.watchPage}
    />,
    <PageMenuItem
      activePath={activePath}
      key={Path.myMoviesPage}
      pageName="My Movies"
      pagePath={Path.myMoviesPage}
    />,
    <PageMenuItem
      activePath={activePath}
      key={Path.friendsPage}
      pageName="Friends"
      pagePath={Path.friendsPage}
    />
  ];

  return (
    <div>
      <Responsive as="div" maxWidth={Responsive.onlyMobile.maxWidth}>
        <Sidebar.Pushable>
          <Sidebar
            animation="overlay"
            as={Menu}
            inverted
            onHide={handleSidebarHide}
            vertical
            visible={sidebarOpen}
          >
            {pageMenuItems}
          </Sidebar>
          <Sidebar.Pusher dimmed={sidebarOpen}>
            <NavBar mobile>
              <div className="navbar-section">
                {Boolean(sessionUser) && (
                  <div className="menu-button">
                    <Icon name="sidebar" onClick={handleToggle} />
                  </div>
                )}
              </div>
              <div className="navbar-section">
                <Logo />
              </div>
              <div className="navbar-section authentication-buttons">
                {Boolean(sessionUser) && <LogoutButton />}
              </div>
            </NavBar>
            <div className="content">{children}</div>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Responsive>
      <Responsive minWidth={Responsive.onlyMobile.maxWidth}>
        <NavBar>
          <Container>
            {Boolean(sessionUser) ? (
              <Menu inverted pointing secondary size="large">
                {/* <Logo /> */}
                {pageMenuItems}
                <div className="authentication-buttons">
                  <LogoutButton />
                </div>
              </Menu>
            ) : (
              <Menu inverted pointing secondary size="large">
                {/* <Logo /> */}
              </Menu>
            )}
          </Container>
        </NavBar>
        <Container className="pageContent">{children}</Container>
      </Responsive>
    </div>
  );
};

export default LayoutContainer;
