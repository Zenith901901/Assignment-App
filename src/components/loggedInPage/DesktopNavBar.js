import React, { useState } from "react";
import { Menu, Icon, Image, Responsive } from "semantic-ui-react";
import DropDown from "./DropDown";
import SearchBar from "./SearchBar";

const DesktopNavBar = props => {
  const [searchBar, setSearchBar] = useState("no");

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

  return (
    <Responsive minWidth={Responsive.onlyComputer.minWidth}>
      <Menu
        inverted
        fixed="top"
        secondary
        stackable
        style={{ background: "#1C1B23" }}
      >
        <Menu.Item>
          <Menu.Header>
            <Image src={require("../../current_test_icon.ico")} size="mini" />
          </Menu.Header>
        </Menu.Item>

        <Menu.Item
          position="right"
          name="add"
          active={props.activeItem === "add"}
          onClick={(e, { name }) => props.handleItemClick(e, { name })}
        >
          <Icon name="add" />
          Add
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

        <Menu.Item position="right">{serachBarConfig[searchBar]}</Menu.Item>
        <Menu.Item>
          <Menu.Menu position="right">
            <DropDown
              userInfo={props.userInfo}
              email={props.email}
              firstName={props.firstName}
              lastName={props.lastName}
              password={props.password}
              _id={props._id}
              dbUrl={props.dbUrl}
              trigger={props.trigger}
              changeState={props.changeState}
            />
          </Menu.Menu>
        </Menu.Item>
      </Menu>
      {props.children}
    </Responsive>
  );
};

export default DesktopNavBar;
