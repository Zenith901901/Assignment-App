import React, { useState } from "react";
import { Menu, Button, Icon, Segment, Responsive } from "semantic-ui-react";
import PageHeading from "./PageHeading";
import DefaultSearchBar from "./DefaultSearchBar";

const MobileDefaultNavBar = props => {
  const [searchBar, setSearchBar] = useState("no");

  const onSearchBlur = () => setSearchBar("no");

  const serachBarConfig = {
    no: (
      <Menu.Item position="left" onClick={() => setSearchBar("yes")}>
        <Button inverted>
          {" "}
          <Icon name="search" />
        </Button>
      </Menu.Item>
    ),
    yes: (
      <Menu.Item position="left">
        <DefaultSearchBar onSearchBlur={onSearchBlur} />
      </Menu.Item>
    )
  };

  return (
    <Responsive maxWidth={Responsive.onlyMobile.maxWidth}>
      <Menu
        fixed="top"
        inverted
        pointing
        secondary
        style={{ background: "#1C1B23" }}
      >
        {serachBarConfig[searchBar]}
        {props.logInTrigger}
      </Menu>

      <Segment
        inverted
        vertical
        textAlign="center"
        style={{
          minHeight: 350,
          padding: "1em 0em",
          background: "#08122A",
          marginTop: "4em"
        }}
      >
        <PageHeading mobile={true} showRegister={props.showRegister} />
      </Segment>
    </Responsive>
  );
};

export default MobileDefaultNavBar;
