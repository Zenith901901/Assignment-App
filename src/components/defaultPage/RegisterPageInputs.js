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
  Message,
  Grid
} from "semantic-ui-react";

const RegisterPageInputs = props => {
  const logInTrigger = (
    <a href="#" onClick={props.showLogin}>
      Log In
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
            {formErrors("firstName")}
            {formErrors("lastName")}
            {formErrors("email")}
            {formErrors("password")}
            {formErrors("confirmPassword")}
          </List>
        </Segment>
      );
    }
  };

  const formValid =
    props.formValid.email &&
    props.formValid.password &&
    props.formValid.firstName &&
    props.formValid.lastName &&
    props.formValid.confirmPassword;
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
          Welcome to Practice-App
        </Header>
        <Header as="h3">Create your Account</Header>
        <Divider />
        <Segment stacked>
          <Form size="large">
            <Form.Field>
              <Grid columns={2}>
                <Grid.Column>
                  <Form.Input
                    error={!props.formValid.firstName}
                    onChange={e => props.handleUserInput(e)}
                    name="firstName"
                    icon="user"
                    iconPosition="left"
                    placeholder="First name"
                    fluid
                  />
                </Grid.Column>
                <Grid.Column>
                  <Form.Input
                    error={!props.formValid.lastName}
                    onChange={e => props.handleUserInput(e)}
                    name="lastName"
                    icon="user"
                    iconPosition="left"
                    placeholder="Last name"
                    fluid
                  />
                </Grid.Column>
              </Grid>
            </Form.Field>
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
            <Form.Input
              error={!props.formValid.confirmPassword}
              onChange={e => props.handleUserInput(e)}
              name="confirmPassword"
              icon="lock"
              iconPosition="left"
              type="password"
              placeholder="Confirm Password"
              fluid
            />
          </Form>
          <Divider />

          <Button
            onClick={props.onSignUpClick}
            disabled={!formValid}
            fluid
            primary
            style={{ background: "teal" }}
          >
            <Icon name="signup" />
            Sign Up
          </Button>
        </Segment>
        {errorSegment()}
        <Message>Already a member? {logInTrigger}</Message>
      </Segment>
    </Modal>
  );
};

export default RegisterPageInputs;
