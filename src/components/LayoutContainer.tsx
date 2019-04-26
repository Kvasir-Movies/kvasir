import React, { useState } from "react";
import {
  Icon,
  Image,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Container
} from "semantic-ui-react";

import { Page } from "../constants";
import logo from "../images/reel-politik-logo-1.png";
import { string } from "prop-types";

interface propTypes {
  activePage: Page;
  className?: string;
  style?: React.CSSProperties;
}

const Logo = () => (
  <Image src={logo} style={{ height: "3em", margin: "0.5em" }} />
);

const LayoutContainer: React.SFC<propTypes> = ({
  activePage,
  children,
  className,
  style
}): JSX.Element => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  function handleSidebarHide() {
    setSidebarOpen(false);
  }

  function handleToggle() {
    setSidebarOpen(!sidebarOpen);
  }
  return (
    <Sidebar.Pushable {...className} {...style}>
      <Sidebar
        animation="overlay"
        as={Menu}
        inverted
        onHide={handleSidebarHide}
        vertical
        visible={sidebarOpen}
      >
        <Menu.Item active={activePage == Page.home} className="sidebarItems">
          Home
        </Menu.Item>
        <Menu.Item
          active={activePage == Page.myMovies}
          className="sidebarItems"
        >
          My Movies
        </Menu.Item>
      </Sidebar>
      <Sidebar.Pusher className="content" dimmed={sidebarOpen}>
        <div className="navbar">
          <Responsive
            as={"div"}
            maxWidth={Responsive.onlyMobile.maxWidth}
            style={{
              display: "flex",
              "justify-content": "space-between",
              "align-items": "center"
            }}
          >
            <div>
              <Icon
                name="sidebar"
                onClick={handleToggle}
                style={{ margin: "0.5em" }}
              />
            </div>
            <div>
              <Logo />
            </div>
            {/* Add an identical hidden dummy element on the far side so that flexbox centers the logo. */}
            <div style={{ margin: "0.5em", visibility: "hidden" }}>
              <Icon name="sidebar" />
            </div>
          </Responsive>
          <Responsive minWidth={Responsive.onlyMobile.maxWidth}>
            <Menu pointing secondary size="large">
              <Logo />
              <Menu.Item
                active={activePage == Page.home}
                className="sidebarItems"
              >
                Home
              </Menu.Item>
              <Menu.Item
                active={activePage == Page.myMovies}
                className="sidebarItems"
              >
                My Movies
              </Menu.Item>
            </Menu>
          </Responsive>
        </div>
        {/* <Segment className="navbar" style={{height: "4em", width: "100%"}}>
          
        </Segment> */}
        {children}
      </Sidebar.Pusher>
    </Sidebar.Pushable>
  );
};

export default LayoutContainer;
