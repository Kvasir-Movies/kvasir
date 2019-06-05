import React, { useState } from "react";
import {
  Icon,
  Image,
  Menu,
  Responsive,
  Sidebar,
  Button
} from "semantic-ui-react";

import { Path } from "../constants";
import logo from "../images/reel-politik-logo-1.png";
import { User } from "../types";

const Logo = () => <Image className="logo" src={logo} />;

const NavBar: React.SFC<{ mobile?: boolean }> = ({
  children,
  mobile
}): JSX.Element => (
  <div className={`navbar ${mobile ? "mobile" : "desktop"}`}>{children}</div>
);

const LayoutContainer: React.SFC<{
  activePath?: Path | null;
  sessionUser?: User | null;
  setSessionUser: (sessionUser: User | null) => void;
}> = ({ activePath, children, sessionUser, setSessionUser }): JSX.Element => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  function handleSidebarHide() {
    setSidebarOpen(false);
  }
  function handleToggle() {
    setSidebarOpen(!sidebarOpen);
  }

  const handleLogout = () => {
    fetch("/logout", { method: "POST" }).then(response => {
      if (response.ok) {
        setSessionUser(null);
      }
    });
  };

  const LogoutButton = () => (
    <Button basic inverted onClick={handleLogout}>
      Log Out
    </Button>
  );

  const menuItems = [
    <Menu.Item active={activePath == Path.explorePage} key={Path.explorePage}>
      Explore
    </Menu.Item>,
    <Menu.Item active={activePath == Path.myMoviesPage} key={Path.myMoviesPage}>
      My Movies
    </Menu.Item>
  ];

  return (
    <div className="fill-height">
      <Responsive
        as="div"
        className="fill-height"
        maxWidth={Responsive.onlyMobile.maxWidth}
      >
        <Sidebar.Pushable>
          <Sidebar
            animation="overlay"
            as={Menu}
            inverted
            onHide={handleSidebarHide}
            vertical
            visible={sidebarOpen}
          >
            {menuItems}
          </Sidebar>
          <Sidebar.Pusher className="fill-height" dimmed={sidebarOpen}>
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
          {Boolean(sessionUser) ? (
            <Menu pointing secondary size="large">
              <Logo />
              {menuItems}
              <div className="authentication-buttons">
                <LogoutButton />
              </div>
            </Menu>
          ) : (
            <Menu pointing secondary size="large">
              <Logo />
            </Menu>
          )}
        </NavBar>
        <div className="content">{children}</div>
      </Responsive>
    </div>
  );
};

export default LayoutContainer;
