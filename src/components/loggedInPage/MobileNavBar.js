import React, { useState } from "react";
import {
  Menu,
  Icon,
  Image,
  Responsive,
  Sidebar,
  Header
} from "semantic-ui-react";
import SearchBar from "./SearchBar";
import PasswordChange from "./PasswordChange";
import AddNewContent from "./AddNewContent";
import YourProfile from "./YourProfile";

const MobileNavBar = props => {
  const [searchBar, setSearchBar] = useState("no");
  const [open, setOpen] = useState(false);

  const handleSidebarHide = () => setOpen(false);

  const handleToggle = () => setOpen(true);

  const onSearchBlur = () => setSearchBar("no");

  const serachBarConfig = {
    no: (
      <React.Fragment>
        <Menu.Item
          icon="search"
          position="left"
          onClick={() => setSearchBar("yes")}
        />
      </React.Fragment>
    ),
    yes: (
      <Menu.Item position="left">
        <SearchBar onSearchBlur={onSearchBlur} />
      </Menu.Item>
    )
  };

  const text = (
    <span>
      Signed in as <strong>{`${props.firstName} ${props.lastName}`}</strong>
    </span>
  );

  const contentTrigger = (
    <Menu.Item name="addNewContent">
      <Icon name="plus" />
      Add new content
    </Menu.Item>
  );
  const profileTrigger = (
    <Menu.Item name="yourProfile">
      <Icon name="user" />
      Your Profile
    </Menu.Item>
  );
  const passwordTrigger = (
    <Menu.Item name="changePassword">
      <Icon name="key" />
      Change Password
    </Menu.Item>
  );

  return (
    <Responsive as={Sidebar.Pushable} maxWidth={Responsive.onlyTablet.maxWidth}>
      <Sidebar
        as={Menu}
        animation="push"
        inverted
        onHide={handleSidebarHide}
        vertical
        visible={open}
      >
        <Menu.Item>
          <Header as="h3" inverted>
            <Image src={require("../../current_test_icon.ico")} size="mini" />{" "}
            Practice-App
          </Header>
        </Menu.Item>

        <Menu.Item
          position="right"
          name="add"
          active={props.activeItem === "add"}
          onClick={(e, { name }) => props.handleItemClick(e, { name })}
        >
          <Icon name="plus" />
          add
        </Menu.Item>

        <Menu.Item
          name="private"
          active={props.activeItem === "private"}
          onClick={(e, { name }) => props.handleItemClick(e, { name })}
        >
          <Icon name="clipboard list outline" />
          Private
        </Menu.Item>
        <Menu.Item
          name="public"
          active={props.activeItem === "public"}
          onClick={(e, { name }) => props.handleItemClick(e, { name })}
        >
          <Icon name="clipboard list" />
          Public
        </Menu.Item>
        <Menu.Item>
          {text}
          <Menu.Menu>
            <AddNewContent
              trigger={contentTrigger}
              _id={props._id}
              dbUrl={props.dbUrl}
              userInfo={props.userInfo}
            />
            <YourProfile
              trigger={profileTrigger}
              firstName={props.firstName}
              lastName={props.lastName}
              email={props.email}
              _id={props._id}
              dbUrl={props.dbUrl}
              userInfo={props.userInfo}
            />
            <PasswordChange
              trigger={passwordTrigger}
              _id={props._id}
              dbUrl={props.dbUrl}
              password={props.password}
              userInfo={props.userInfo}
            />
          </Menu.Menu>
        </Menu.Item>
        <Menu.Item name="logOut" onClick={props.changeState}>
          <Icon name="sign-out" />
          LogOut
        </Menu.Item>
      </Sidebar>
      <Sidebar.Pusher dimmed={open}>
        <Menu fixed="top" inverted secondary style={{ background: "#1C1B23" }}>
          <Menu.Item onClick={handleToggle}>
            <Icon name="sidebar" />
          </Menu.Item>
          <Menu.Item position="right">
            <Menu.Header>
              <Image src={require("../../current_test_icon.ico")} size="mini" />
            </Menu.Header>
          </Menu.Item>
          <Menu.Item position="right">{serachBarConfig[searchBar]}</Menu.Item>
        </Menu>
        {props.children}
      </Sidebar.Pusher>
    </Responsive>
  );
};

export default MobileNavBar;
