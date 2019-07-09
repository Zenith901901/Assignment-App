import React, { useState } from "react";
import {
  Menu,
  Button,
  Icon,
  Segment,
  Image,
  Responsive
} from "semantic-ui-react";
import DefaultSearchBar from "./DefaultSearchBar";
import PageHeading from "./PageHeading";

const DesktopDefaultNavBar = props => {
  const [searchBar, setSearchBar] = useState("no");

  const onSearchBlur = () => setSearchBar("no");

  const serachBarConfig = {
    no: (
      <Menu.Item position="right" onClick={() => setSearchBar("yes")}>
        <Button inverted>
          {" "}
          <Icon name="search" />
        </Button>
      </Menu.Item>
    ),
    yes: (
      <Menu.Item position="right">
        <DefaultSearchBar onSearchBlur={onSearchBlur} />
      </Menu.Item>
    )
  };

  return (
    <Responsive minWidth={Responsive.onlyTablet.minWidth}>
      <Menu
        fixed="top"
        inverted
        secondary
        stackable
        style={{ background: "#1C1B23" }}
      >
        <Menu.Item>
          <Menu.Header>
            <Image src={require("../../current_test_icon.ico")} size="mini" />
          </Menu.Header>
        </Menu.Item>

        <Menu.Item>
          <Menu.Header>
            <h1>Practice-App</h1>
          </Menu.Header>
        </Menu.Item>

        <Menu.Item position="right">
          <Responsive maxWidth={874}>{serachBarConfig[searchBar]}</Responsive>
          <Responsive minWidth={875}>
            <Menu.Item position="right">
              <DefaultSearchBar onSearchBlur={onSearchBlur} />
            </Menu.Item>
          </Responsive>
        </Menu.Item>

        {props.logInTrigger}
        {props.registerTrigger}
      </Menu>

      <Segment
        inverted
        vertical
        textAlign="center"
        style={{
          minHeight: 450,
          padding: "1em 0em",
          background: "#08122A",
          marginTop: "5em"
        }}
      >
        <PageHeading mobile={false} showRegister={props.showRegister} />
      </Segment>
    </Responsive>
  );
};

export default DesktopDefaultNavBar;
