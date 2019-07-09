import React from "react";
import { Dropdown, Divider } from "semantic-ui-react";
import PasswordChange from "./PasswordChange";
import AddNewContent from "./AddNewContent";
import YourProfile from "./YourProfile";

const DropDown = props => {
  const text = (
    <span>
      Signed in as <strong>{`${props.firstName} ${props.lastName}`}</strong>
    </span>
  );

  const contentTrigger = <Dropdown.Item icon="plus" text="Add New Content" />;
  const profileTrigger = <Dropdown.Item icon="user" text="Your Profile" />;
  const passwordTrigger = <Dropdown.Item icon="key" text="Change Password" />;

  return (
    <Dropdown
      pointing="top right"
      simple
      trigger={props.trigger}
      style={{ background: "#1C1B23" }}
    >
      <Dropdown.Menu>
        <Dropdown.Item text={text} disabled={true} />
        <Divider />
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
        <Divider />
        <Dropdown.Item
          icon="sign-out"
          text="LogOut"
          onClick={props.changeState}
        />
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default DropDown;
