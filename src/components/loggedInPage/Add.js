import React, { Component } from "react";
import {
  Container,
  Form,
  Button,
  List,
  Divider,
  Dropdown,
  Header,
  Image,
  Segment
} from "semantic-ui-react";
import axios from "axios";

class Add extends Component {
  state = {
    urlValid: true,
    urlError: "",
    url: "",
    type: "public",
    successMessage: false,
    errorMessage: false,
    messageList: {
      errorMessage: "",
      successMessage: "Site added succesfully"
    }
  };

  validateForm = () => {
    // let index = 0;
    const url = this.state.url;
    if (url.length === 0) {
      this.setState({
        urlValid: false,
        urlError: "Please type the URL",
        errorMessage: true
      });
      console.log(
        this.state.urlValid,
        this.state.errorMessage,
        this.state.urlError
      );
    }
    // else {
    //   while (index < sites.length) {
    //     if (sites[index] === url) {
    //       urlValid = false;
    //       urlError = "URL already added";
    //       this.setState({ urlValid, urlError });
    //       break;
    //     }
    //     index++;
    //   }
    // }
  };

  onAddContentClick = () => {
    console.log(this.state.url);
    this.validateForm();
    console.log(this.state.urlValid);
    if (this.state.urlValid === true) {
      const siteData = {
        url: this.state.url,
        type: this.state.type
      };

      axios
        .post(`${this.props.dbUrl}/sites`, siteData)
        .then(response => {
          console.log(response.data);
          this.setState({ successMessage: true, url: "" });
          this.props.userInfo();
        })
        .catch(error => {
          const messageList = this.state;
          messageList["errorMessage"] = error;
          this.setState({ errorMessage: true, messageList });
          console.log(error);
        });
    }
  };

  formMessages = field => {
    if (this.state[field]) {
      return <List.Item> {this.state.messageList[field]}</List.Item>;
    }
  };

  messageSegment = () => {
    if (this.state.successMessage || this.state.errorMessage) {
      return (
        <Segment raised style={{ background: "AliceBlue" }} textAlign="left">
          <List bulleted>
            {this.formMessages("successMessage")}
            {this.formMessages("errorMessage")}
          </List>
        </Segment>
      );
    }
  };

  formErrors = () => {
    if (!this.state.urlValid) {
      return (
        <Segment raised style={{ background: "AliceBlue" }} textAlign="left">
          <List bulleted>
            <List.Item> {this.state.urlError}</List.Item>
          </List>
        </Segment>
      );
    }
  };

  render() {
    const options = [
      {
        key: "public",
        text: "Public",
        value: "public",
        onClick: () => {
          this.setState({ type: "public" });
        }
      },
      {
        key: "private",
        text: "Private",
        value: "private",
        onClick: () => {
          this.setState({ type: "private" });
        }
      }
    ];
    return (
      <React.Fragment>
        <Header as="h2" textAlign="center" style={{ marginTop: "1em" }}>
          <Image src={require("../../current_test_icon.ico")} size="small" />{" "}
          Add new content
        </Header>
        <Container text>
          <Form size="large">
            <Form.Input
              action={
                <Dropdown
                  button
                  basic
                  floating
                  options={options}
                  defaultValue="public"
                />
              }
              error={!this.state.urlValid}
              fluid
              onChange={e =>
                this.setState({
                  url: e.target.value,
                  urlValid: true,
                  successMessage: false,
                  errorMessage: false
                })
              }
              icon="linkify"
              iconPosition="left"
              placeholder="Url"
              defaultValue="https://"
            />
          </Form>

          <Button
            onClick={this.onAddContentClick}
            content="Add"
            icon="plus"
            // fluid
            primary
            style={{ background: "teal", marginTop: "1.5em" }}
            disabled={!this.state.urlValid}
          />
          {this.messageSegment()}
          {this.formErrors()}
        </Container>
      </React.Fragment>
    );
  }
}

export default Add;
