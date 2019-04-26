import React, { useState } from "react";
import {
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Icon,
  Button
} from "semantic-ui-react";

const NavMenu = ({ vertical }: { vertical: boolean }): JSX.Element => (
  <Menu inverted size="huge" style={{ height: "100%" }} vertical={vertical}>
    <Menu.Item active className="sidebarItems">
      Watch Movies
    </Menu.Item>
    <Menu.Item className="sidebarItems">My Movies</Menu.Item>
  </Menu>
);

const LayoutContainer: React.SFC<{
  className?: string;
  style?: React.CSSProperties;
}> = ({ children, className, style }): JSX.Element => {
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
        onHide={handleSidebarHide}
        visible={sidebarOpen}
      >
        <NavMenu vertical />
      </Sidebar>
      <Sidebar.Pusher className="content" dimmed={sidebarOpen}>
        <Segment className="navBar" vertical>
          <Menu pointing secondary size="large">
            <Responsive
              as={Menu.Item}
              fitted
              maxWidth={Responsive.onlyMobile.maxWidth}
              onClick={handleToggle}
            >
              <Icon name="sidebar" />
            </Responsive>
            <Responsive minWidth={Responsive.onlyMobile.maxWidth}>
              <NavMenu vertical={false} />
            </Responsive>
            <Menu.Item position="right">
              <Button>Log In</Button>
              <Button style={{ marginLeft: "0.5em" }}>Sign Up</Button>
            </Menu.Item>
          </Menu>
        </Segment>
        {children}
      </Sidebar.Pusher>
    </Sidebar.Pushable>
  );
};

export default LayoutContainer;
