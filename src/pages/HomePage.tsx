import React, { SFC, useState } from "react";
import {
  Container,
  Header,
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
      Watch Movie
    </Menu.Item>
    <Menu.Item className="sidebarItems">My Movies</Menu.Item>
  </Menu>
);

const HomePage = (): JSX.Element => {
  const ResponsiveContainer: SFC = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    function handleSidebarHide() {
      setSidebarOpen(false);
    }

    function handleToggle() {
      setSidebarOpen(!sidebarOpen);
    }
    return (
      <Sidebar.Pushable>
        <Sidebar
          animation="overlay"
          onHide={handleSidebarHide}
          visible={sidebarOpen}
        >
          <NavMenu vertical />
        </Sidebar>
        <Sidebar.Pusher className="content" dimmed={sidebarOpen}>
          <Segment inverted vertical>
            <Menu inverted pointing secondary size="large">
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
                <Button inverted>Log In</Button>
                <Button inverted style={{ marginLeft: "0.5em" }}>
                  Sign Up
                </Button>
              </Menu.Item>
            </Menu>
          </Segment>
          {children}
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    );
  };

  return (
    <ResponsiveContainer>
      <h1>Stuff goes here</h1>
    </ResponsiveContainer>
  );
};

export default HomePage;
