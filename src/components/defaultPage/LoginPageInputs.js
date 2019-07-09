import React from "react";
import {
  Modal,
  Form,
  Button,
  List,
  Divider,
  Header,
  Image,
  Segment,
  Icon,
  Message
} from "semantic-ui-react";

const LoginPageInputs = props => {
  const registerTrigger = (
    <a href="#" onClick={props.showRegister}>
      Sign Up
    </a>
  );

  const formErrors = field => {
    if (!props.formValid[field]) {
      return <List.Item> {props.formErrors[field]}</List.Item>;
    }
  };

  const errorSegment = () => {
    if (!formValid) {
      return (
        <Segment raised style={{ background: "AliceBlue" }} textAlign="left">
          <List bulleted>
            {formErrors("email")}
            {formErrors("password")}
          </List>
        </Segment>
      );
    }
  };

  const formValid = props.formValid.email && props.formValid.password;

  return (
    <Modal
      dimmer="inverted"
      open={props.isOpen}
      onMount={props.open}
      centered={false}
      onClose={props.close}
      size="small"
    >
      <Segment textAlign="center" style={{ background: "AliceBlue" }}>
        <Header as="h2" textAlign="center">
          <Image src={require("../../current_test_icon.ico")} size="small" />{" "}
          Welcome Back to Practice-App
        </Header>
        <Header as="h3">Log into your Account</Header>
        <Divider />
        <Segment stacked>
          <Form size="large">
            <Form.Input
              error={!props.formValid.email}
              onChange={e => props.handleUserInput(e)}
              name="email"
              icon="mail"
              iconPosition="left"
              placeholder="Email"
              fluid
            />
            <Form.Input
              error={!props.formValid.password}
              onChange={e => props.handleUserInput(e)}
              name="password"
              icon="lock"
              iconPosition="left"
              type="password"
              placeholder="Password"
              fluid
            />
          </Form>
          <Divider />

          <Button
            onClick={props.onLoginClick}
            disabled={!formValid}
            fluid
            primary
            style={{ background: "teal" }}
          >
            <Icon name="sign-in" />
            Login
          </Button>
          <Header as="h5" textAlign="right">
            <a href="#">Forgot Password?</a>
          </Header>
        </Segment>
        {errorSegment()}
        <Message>Not a member yet?{registerTrigger}</Message>
      </Segment>
    </Modal>
  );
};

export default LoginPageInputs;
