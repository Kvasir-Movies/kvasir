import React, { useState } from "react";
import {
  Icon,
  Image,
  Menu,
  Responsive,
  Sidebar,
  Button
} from "semantic-ui-react";

import { Paths } from "../constants";
import logo from "../images/reel-politik-logo-1.png";
import { User } from "../types";

interface propTypes {
  activePath: Paths;
}

const Logo = () => <Image className="logo" src={logo} />;

const NavBar: React.SFC<{ mobile?: boolean }> = ({
  children,
  mobile
}): JSX.Element => (
  <div className={`navbar ${mobile ? "mobile" : "desktop"}`}>{children}</div>
);

const LayoutContainer: React.SFC<{
  activePath?: Paths | null;
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
    <Menu.Item active={activePath == Paths.explorePage} key={Paths.explorePage}>
      Explore
    </Menu.Item>,
    <Menu.Item
      active={activePath == Paths.myMoviesPage}
      key={Paths.myMoviesPage}
    >
      My Movies
    </Menu.Item>
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
            {menuItems}
          </Sidebar>
          <Sidebar.Pusher className="content" dimmed={sidebarOpen}>
            <NavBar mobile>
              {/* <div className="menu-button">
                <Icon name="sidebar" onClick={handleToggle} />
              </div>
              <Logo />
              <div className="menu-button hidden">
                <Icon name="sidebar" />
              </div> */}
              <div
                style={{ display: "flex", flexBasis: "33%", padding: "0.5em" }}
              >
                {Boolean(sessionUser) && (
                  <Icon
                    name="sidebar"
                    onClick={handleToggle}
                    style={{ cursor: "pointer" }}
                  />
                )}
              </div>
              <div
                className="flex-center"
                style={{ display: "flex", flexBasis: "34%" }}
              >
                <Logo />
              </div>
              <div
                style={{
                  display: "flex",
                  flexBasis: "33%",
                  flexDirection: "row-reverse",
                  padding: "0.5em"
                }}
              >
                {Boolean(sessionUser) && <LogoutButton />}
              </div>
            </NavBar>
            {children}
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Responsive>
      <Responsive minWidth={Responsive.onlyMobile.maxWidth}>
        <NavBar>
          {Boolean(sessionUser) ? (
            <Menu pointing secondary size="large">
              <Logo />
              {menuItems}
            </Menu>
          ) : (
            <Logo />
          )}
        </NavBar>
        <div style={{ display: "flex", flexGrow: 1, margin: "1em" }}>
          {children}
        </div>
      </Responsive>
    </div>
  );
};

export default LayoutContainer;
