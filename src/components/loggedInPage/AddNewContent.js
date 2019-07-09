import React, { Component } from "react";
import {
  Modal,
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

class AddNewContent extends Component {
  state = {
    isOpen: false,
    urlValid: true,
    urlError: "",
    url: "",
    type: "public"
  };

  open = () => this.setState({ isOpen: true, urlValid: true, url: "" });

  close = () => {
    if (this.state.isOpen) {
      this.setState({ isOpen: false });
    }
  };

  validateForm = () => {
    // let index = 0;
    const url = this.state.url;
    let { urlValid, urlError } = this.state;
    if (url.length === 0) {
      urlValid = false;
      urlError = "Please type the URL";
      this.setState({ urlValid, urlError });
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
    if (this.state.urlValid === true) {
      const siteData = {
        url: this.state.url,
        type: this.state.type
      };

      axios
        .post(`${this.props.dbUrl}/sites`, siteData)
        .then(response => {
          console.log(response.data);
          this.props.userInfo();
        })
        .catch(error => {
          console.log(error);
        });

      this.close();
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
    const { isOpen } = this.state;

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
      <Modal
        dimmer="inverted"
        open={isOpen}
        onOpen={this.open}
        trigger={this.props.trigger}
        centered={false}
        onClose={this.close}
        size="small"
      >
        <Segment textAlign="center" style={{ background: "AliceBlue" }}>
          <Header as="h2" textAlign="center">
            <Image src={require("../../current_test_icon.ico")} size="small" />{" "}
            Add new content
          </Header>
          <Divider />

          <Segment stacked>
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
                  this.setState({ url: e.target.value, urlValid: true })
                }
                icon="linkify"
                iconPosition="left"
                placeholder="Url"
                defaultValue="https://"
              />
            </Form>
            <Divider />

            <Button
              onClick={this.onAddContentClick}
              content="Submit"
              fluid
              primary
              style={{ background: "teal" }}
              disabled={!this.state.urlValid}
            />
          </Segment>

          {this.formErrors()}
        </Segment>
      </Modal>
    );
  }
}

export default AddNewContent;
