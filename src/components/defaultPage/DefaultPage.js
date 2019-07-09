import React, { useState } from "react";
import { Menu, Button, Icon } from "semantic-ui-react";
import DesktopDefaultNavBar from "./DesktopDefaultNavBar";
import MobileDefaultNavBar from "./MobileDefaultNavBar";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";

const DefaultPage = props => {
  const [isLogin, setIsLogin] = useState(false);
  const [isRegister, setIsRegister] = useState(false);

  const showLogin = () => {
    setIsLogin(true);
    setIsRegister(false);
  };
  const showRegister = () => {
    setIsRegister(true);
    setIsLogin(false);
  };

  const hideModal = () => {
    setIsLogin(false);
    setIsRegister(false);
  };

  const logInTrigger = (
    <Menu.Item name="login" active={false} onClick={showLogin}>
      <Button inverted>
        <Icon name="sign-in" />
        Log In
      </Button>
    </Menu.Item>
  );

  const registerTrigger = (
    <Menu.Item name="register" active={false} onClick={showRegister}>
      <Button inverted color="red">
        <Icon name="signup" />
        Sign Up
      </Button>
    </Menu.Item>
  );

  return (
    <React.Fragment>
      <DesktopDefaultNavBar
        showRegister={showRegister}
        logInTrigger={logInTrigger}
        registerTrigger={registerTrigger}
      />
      <MobileDefaultNavBar
        showRegister={showRegister}
        logInTrigger={logInTrigger}
        registerTrigger={registerTrigger}
      />
      <LoginPage
        dbUrl={props.dbUrl}
        showRegister={showRegister}
        userUpdater={props.userUpdater}
        isOpen={isLogin}
        hideModal={hideModal}
      />
      <RegisterPage
        dbUrl={props.dbUrl}
        showLogin={showLogin}
        userUpdater={props.userUpdater}
        isOpen={isRegister}
        hideModal={hideModal}
      />
    </React.Fragment>
  );
};

export default DefaultPage;
