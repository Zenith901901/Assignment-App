import React from "react";
import DesktopNavBar from "./DesktopNavBar";
import { Image } from "semantic-ui-react";
import MobileNavBar from "./MobileNavBar";

const NavBar = props => {
  const trigger = (
    <span>
      <Image
        src="https://react.semantic-ui.com/images/wireframe/square-image.png"
        avatar
      />
    </span>
  );

  return (
    <React.Fragment>
      <DesktopNavBar
        handleItemClick={props.handleItemClick}
        activeItem={props.activeItem}
        changeState={props.changeState}
        email={props.email}
        firstName={props.firstName}
        lastName={props.lastName}
        password={props.password}
        userInfo={props.userInfo}
        _id={props._id}
        dbUrl={props.dbUrl}
        trigger={trigger}
      >
        {props.children}
      </DesktopNavBar>
      <MobileNavBar
        handleItemClick={props.handleItemClick}
        activeItem={props.activeItem}
        changeState={props.changeState}
        email={props.email}
        firstName={props.firstName}
        lastName={props.lastName}
        password={props.password}
        userInfo={props.userInfo}
        _id={props._id}
        dbUrl={props.dbUrl}
        trigger={trigger}
      >
        {props.children}
      </MobileNavBar>
    </React.Fragment>
  );
};

export default NavBar;
