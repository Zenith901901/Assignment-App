import React from "react";
import { Container, Header, Button, Icon } from "semantic-ui-react";

const PageHeading = props => {
  const title = (
    <React.Fragment>
      <Header
        as="h3"
        content="Practice-App"
        inverted
        style={{
          fontSize: "1.5em",
          fontWeight: "normal",
          marginBottom: 0,
          marginTop: "1.5em"
        }}
      />
    </React.Fragment>
  );

  const registerTrigger = (
    <Button
      onClick={props.showRegister}
      size="huge"
      name="register"
      color="red"
      style={{
        marginTop: props.mobile ? "0.25em" : ".5em"
      }}
    >
      Get Started
      <Icon name="right arrow" />
    </Button>
  );

  const mobileConfig = props.mobile ? title : <React.Fragment />;

  const HomepageHeading = mobile => (
    <Container text>
      {mobileConfig}
      <Header
        as="h1"
        content="A part of your everyday life"
        inverted
        style={{
          fontSize: mobile ? "2em" : "3.5em",
          fontWeight: "normal",
          marginBottom: 0,
          marginTop: mobile ? "0.5em" : "1.5em"
        }}
      />
      <Header
        as="h2"
        content="A better and organized way to stay informed"
        inverted
        style={{
          fontSize: mobile ? "1.5em" : "1.7em",
          fontWeight: "normal",
          marginTop: mobile ? "0.5em" : "em"
        }}
      />
      {registerTrigger}
    </Container>
  );

  return <React.Fragment> {HomepageHeading(props.mobile)}</React.Fragment>;
};

export default PageHeading;
