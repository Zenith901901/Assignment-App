import React, { Component } from "react";
import {
  Container,
  Form,
  Button,
  List,
  Icon,
  Dropdown,
  Header,
  Image,
  Segment,
  Card,
  Grid,
  Loader
} from "semantic-ui-react";
import axios from "axios";

class Add extends Component {
  state = {
    userName: "",
    urlValid: true,
    urlError: "",
    url: "https://",
    type: "public",
    successMessage: false,
    errorMessage: false,
    isLoader: false,
    messageList: {
      errorMessage: "",
      successMessage: "Site added succesfully"
    },
    response: []
  };

  componentDidMount() {
    let responseData = [];
    let data = "";
    axios
      .get(`${this.props.dbUrl}/sites`)
      .then(response => {
        responseData = response.data;
        this.setState({ response: responseData });
        axios
          .get(`${this.props.dbUrl}/users/id/${this.props._id}`)
          .then(res => {
            data = res.data;
            this.setState({
              userName: `${data["firstName"]} ${data["lastName"]}`
            });
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(error => {
        console.log(error);
      });
  }

  closeLoader = () => this.setState({ isLoader: false });

  validateForm = () => {
    const url = this.state.url;
    if (url.length === 0) {
      this.setState({
        urlValid: false,
        urlError: "Please type the URL",
        errorMessage: true
      });
    }
  };

  onAddContentClick = () => {
    //this.validateForm();
    const url = this.state.url;
    if (url === "https://" || url === "") {
      this.setState({
        urlValid: false,
        urlError: "Please type the URL"
      });

      return;
    } else {
      this.setState({ isLoader: "true" });
    }
    if (this.state.urlValid === true) {
      const siteData = {
        url: this.state.url,
        type: this.state.type,
        createdBy: this.props._id
      };
      axios
        .post(`${this.props.dbUrl}/sites`, siteData)
        .then(response => {
          console.log(response.data);
          if (typeof response.data === "string") {
            const messageList = this.state;
            messageList["errorMessage"] = "Invalid Url";
            this.closeLoader();
            this.setState({
              errorMessage: true,
              messageList
            });
          } else {
            axios
              .get(`${this.props.dbUrl}/sites`)
              .then(response => {
                this.closeLoader();
                this.setState({
                  response: response.data,
                  successMessage: true,
                  url: "https://"
                });
              })
              .catch(error => {
                console.log(error);
              });
          }
        })
        .catch(error => {
          const messageList = this.state;
          messageList["errorMessage"] = error;
          this.setState({ errorMessage: true, messageList });
        });
    }
  };

  formMessages = field => {
    if (this.state[field]) {
      console.log(this.state.messageList[field]);
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
    const extra = (
      <a>
        <Icon name="user" />
        Created by: {this.state.userName}
      </a>
    );

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
                  value={this.state.type}
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
              // defaultValue="https://"
              value={this.state.url}
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
          <Loader
            active={this.state.isLoader}
            inline="centered"
            style={{ marginTop: "1em" }}
          />
          {this.messageSegment()}
          {this.formErrors()}
        </Container>
        <Grid
          centered
          textAlign="left"
          stackable
          columns={3}
          style={{ marginTop: "1em" }}
        >
          {this.state.response
            .reverse()
            .filter(obj => {
              return obj.createdBy === this.props._id;
            })
            .map(obj => (
              <Grid.Column stretched>
                <Card
                  image={obj.image}
                  header={obj.title}
                  meta={<a href={obj.url}>{obj.url}</a>}
                  description={obj.description}
                  extra={obj.type}
                />
              </Grid.Column>
            ))}
        </Grid>
      </React.Fragment>
    );
  }
}

export default Add;
