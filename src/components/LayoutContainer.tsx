import React, { useState } from "react";
import { Icon, Image, Menu, Responsive, Sidebar } from "semantic-ui-react";

import { Page } from "../constants";
import logo from "../images/reel-politik-logo-1.png";

interface propTypes {
  activePage: Page;
}

const Logo = () => <Image className="logo" src={logo} />;

const NavBar: React.SFC<{ mobile?: boolean }> = ({
  children,
  mobile
}): JSX.Element => (
  <div className={`navbar ${mobile ? "mobile" : "desktop"}`}>{children}</div>
);

const LayoutContainer: React.SFC<propTypes> = ({
  activePage,
  children
}): JSX.Element => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  function handleSidebarHide() {
    setSidebarOpen(false);
  }

  function handleToggle() {
    setSidebarOpen(!sidebarOpen);
  }

  const menuItems = [
    <Menu.Item active={activePage == Page.home}>Home</Menu.Item>,
    <Menu.Item active={activePage == Page.myMovies}>My Movies</Menu.Item>
  ];

  return (
    <div>
      <Responsive maxWidth={Responsive.onlyMobile.maxWidth}>
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
              <div className="menu-button">
                <Icon name="sidebar" onClick={handleToggle} />
              </div>
              <Logo />
              {/* Add an identical hidden dummy element on the far side so that flexbox centers the logo. */}
              <div className="menu-button hidden">
                <Icon name="sidebar" />
              </div>
            </NavBar>
            {children}
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Responsive>
      <Responsive minWidth={Responsive.onlyMobile.maxWidth}>
        <NavBar>
          <Menu pointing secondary size="large">
            <Logo />
            {menuItems}
          </Menu>
        </NavBar>
        {children}
      </Responsive>
    </div>
  );
};

export default LayoutContainer;
