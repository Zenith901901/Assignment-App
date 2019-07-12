import React, { useEffect, useState } from "react";
import {
  Menu,
  Button,
  Icon,
  Grid,
  Card,
  Container,
  Segment,
  Header
} from "semantic-ui-react";

import DesktopDefaultNavBar from "./DesktopDefaultNavBar";
import MobileDefaultNavBar from "./MobileDefaultNavBar";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import axios from "axios";

const DefaultPage = props => {
  const [isLogin, setIsLogin] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [response, setResponse] = useState([]);

  useEffect(() => {
    axios
      .get(`${props.dbUrl}/sites`)
      .then(res => {
        setResponse(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

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
      <Container>
        <Grid
          centered
          textAlign="left"
          stackable
          columns={3}
          style={{ marginTop: "1em" }}
        >
          {response
            .filter(obj => {
              return obj.type === "public";
            })
            .map(obj => (
              <Grid.Column stretched>
                <Card
                  image={obj.image}
                  header={obj.title}
                  meta={<a href={obj.url}>{obj.url}</a>}
                  description={obj.description}
                />
              </Grid.Column>
            ))}
        </Grid>
      </Container>
      <Segment
        style={{ minHeight: 200, background: "#1C1B23", marginTop: "2em" }}
        textAlign="center"
        vertical
      >
        <Header inverted as="h1">
          Footer
        </Header>
      </Segment>
    </React.Fragment>
  );
};

export default DefaultPage;
