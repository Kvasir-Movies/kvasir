import { History } from "history";
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

const Logo = () => (
  <Image src={logo} style={{ height: "3em", margin: "0.5em" }} />
);

const PageMenuItem = ({
  activePath,
  history,
  pageName,
  pagePath
}: {
  activePath?: Paths;
  history: History;
  pageName: string;
  pagePath: Paths;
}) => (
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

const LayoutContainer: React.SFC<{
  activePath?: Paths;
  history: History;
  sessionUser?: User | null;
  setSessionUser: (sessionUser: User | null) => void;
}> = ({
  activePath,
  children,
  history,
  sessionUser,
  setSessionUser
}): JSX.Element => {
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

  const pageMenuItems = [
    <PageMenuItem
      activePath={activePath}
      history={history}
      pageName="Explore"
      pagePath={Paths.explorePage}
    />,
    <PageMenuItem
      activePath={activePath}
      history={history}
      pageName="Watch"
      pagePath={Paths.watchPage}
    />,
    <PageMenuItem
      activePath={activePath}
      history={history}
      pageName="My Movies"
      pagePath={Paths.myMoviesPage}
    />,
    <PageMenuItem
      activePath={activePath}
      history={history}
      pageName="Friends"
      pagePath={Paths.friendsPage}
    />
  ];

  return (
    <Sidebar.Pushable className="flex-fill">
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
      <Sidebar.Pusher
        className="flex-fill"
        dimmed={sidebarOpen}
        style={{ flexDirection: "column" }}
      >
        <div className="navbar">
          <Responsive
            as={"div"}
            maxWidth={Responsive.onlyMobile.maxWidth}
            style={{
              alignItems: "center",
              display: "flex",
              justifyContent: "space-between"
            }}
          >
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
          </Responsive>
          <Responsive minWidth={Responsive.onlyMobile.maxWidth}>
            {Boolean(sessionUser) ? (
              <Menu pointing secondary size="large">
                <Logo />
                {pageMenuItems}
                <Menu.Item position="right">
                  <LogoutButton />
                </Menu.Item>
              </Menu>
            ) : (
              <Logo />
            )}
          </Responsive>
        </div>
        <div style={{ display: "flex", flexGrow: 1, margin: "1em" }}>
          {children}
        </div>
      </Sidebar.Pusher>
    </Sidebar.Pushable>
  );
};

export default LayoutContainer;
