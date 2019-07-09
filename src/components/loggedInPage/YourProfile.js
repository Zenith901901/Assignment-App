import React, { Component } from "react";
import {
  Modal,
  Form,
  Button,
  List,
  Divider,
  Header,
  Image,
  Segment,
  Grid
} from "semantic-ui-react";
import axios from "axios";

class YourProfile extends Component {
  state = {
    isOpen: false,
    nameValid: {
      firstName: true,
      lastName: true
    },
    nameErrors: {
      firstName: "",
      lastName: ""
    },
    isNameEdit: "no",
    imageUrl: "https://react.semantic-ui.com/images/avatar/large/rachel.png",
    firstName: "",
    lastName: ""
  };

  onNameEditClick = () => this.setState({ isNameEdit: "yes" });

  open = () =>
    this.setState({
      isOpen: true,
      firstName: this.props.firstName,
      lastName: this.props.lastName,
      nameValid: {
        firstName: true,
        lastName: true
      }
    });

  close = () => {
    if (this.state.isNameEdit === "yes") {
      this.setState({
        isNameEdit: "no",
        nameValid: {
          firstName: true,
          lastName: true
        },
        firstName: this.props.firstName,
        lastName: this.props.lastName,
        isOpen: false
      });
    } else if (this.state.isOpen) {
      this.setState({ isOpen: false });
    }
  };

  onCancelEditClick = () =>
    this.setState({
      isNameEdit: "no",
      firstName: this.props.firstName,
      lastName: this.props.lastName,
      nameValid: {
        firstName: true,
        lastName: true
      }
    });

  validateForm = field => {
    let { nameErrors, nameValid } = this.state;
    switch (field) {
      case "firstName": {
        const firstNameStr = this.state.firstName.trim();
        const nameArr = firstNameStr.split(" ");
        const nameLength = nameArr.length;
        if (firstNameStr.length === 0) {
          nameValid[field] = false;
          nameErrors[field] = "Please enter your first name";
        } else if (firstNameStr.length > 20) {
          nameValid[field] = false;
          nameErrors[field] = "first name Must be less then 20 Characters";
        } else if (/[^a-z' ']/i.test(firstNameStr)) {
          nameValid[field] = false;
          nameErrors[field] = "Invalid first name";
        } else if (nameLength > 1) {
          nameValid[field] = false;
          nameErrors[field] = "Must type only first name";
        }
        break;
      }
      case "lastName": {
        const lastNameStr = this.state.lastName.trim();
        const nameArr = lastNameStr.split(" ");
        const nameLength = nameArr.length;
        if (lastNameStr.length === 0) {
          nameValid[field] = false;
          nameErrors[field] = "Please enter your last name";
        } else if (lastNameStr.length > 20) {
          nameValid[field] = false;
          nameErrors[field] = "lats name Must be less then 20 Characters";
        } else if (/[^a-z' ']/i.test(lastNameStr)) {
          nameValid[field] = false;
          nameErrors[field] = "Invalid last name";
        } else if (nameLength > 1) {
          nameValid[field] = false;
          nameErrors[field] = "Must type only last name";
        }
        break;
      }
      default: {
        console.log("Invalid field");
        break;
      }
    }
    this.setState({ nameErrors, nameValid });
  };

  onSaveNameClick = () => {
    this.validateForm("firstName");
    this.validateForm("lastName");
    if (this.state.nameValid.firstName && this.state.nameValid.lastName) {
      axios
        .get(`${this.props.dbUrl}/users/id/${this.props._id}`)
        .then(res => {
          let userData = res.data;
          userData["firstName"] = this.state.firstName;
          userData["lastName"] = this.state.lastName;
          axios
            .put(`${this.props.dbUrl}/users/${this.props._id}`, userData)
            .then(response => {
              console.log("Name updated");
              this.props.userInfo();
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(err => {
          console.log(err);
        });
      this.setState({
        isNameEdit: "no",
        nameValid: {
          firstName: true,
          lastName: true
        }
      });
    }
  };

  nameError = field => {
    if (!this.state.nameValid[field]) {
      return <List.Item> {this.state.nameErrors[field]}</List.Item>;
    }
  };

  errorSegment = () => {
    if (!this.state.nameValid.firstName || !this.state.nameValid.lastName) {
      return (
        <Segment raised style={{ background: "AliceBlue" }} textAlign="left">
          <List bulleted>
            {this.nameError("firstName")}
            {this.nameError("lastName")}
          </List>
        </Segment>
      );
    }
  };

  render() {
    const { isOpen } = this.state;

    const allValid = {
      firstName: true,
      lastName: true
    };

    const editNameConfig = {
      yes: (
        <Form size="large" style={{ marginTop: "2em", marginBottom: "1em" }}>
          <Grid columns={2}>
            <Grid.Column>
              <Form.Input
                error={!this.state.nameValid.firstName}
                onChange={e =>
                  this.setState({
                    firstName: e.target.value,
                    nameValid: allValid
                  })
                }
                name="firstName"
                icon="user"
                defaultValue={this.state.firstName}
                iconPosition="left"
                placeholder="First name"
                fluid
              />
            </Grid.Column>
            <Grid.Column>
              <Form.Input
                error={!this.state.nameValid.lastName}
                onChange={e =>
                  this.setState({
                    lastName: e.target.value,
                    nameValid: allValid
                  })
                }
                name="lastName"
                icon="user"
                defaultValue={this.state.lastName}
                iconPosition="left"
                placeholder="Last name"
                fluid
              />
            </Grid.Column>
          </Grid>
        </Form>
      ),
      no: (
        <Grid columns={3} style={{ marginTop: "1em" }}>
          <Grid.Column />
          <Grid.Column textAlign="center">
            <Header as="h2">
              {`${this.state.firstName} ${this.state.lastName}`}
            </Header>
          </Grid.Column>
          <Grid.Column textAlign="left">
            <Button
              style={{ background: "Azure" }}
              icon="pencil"
              onClick={this.onNameEditClick}
            />
          </Grid.Column>
        </Grid>
      )
    };

    const buttonConfig = {
      yes: (
        <Grid columns={2}>
          <Grid.Column>
            <Button
              onClick={this.onSaveNameClick}
              content="Save"
              fluid
              primary
              style={{ background: "teal" }}
              disabled={
                !this.state.nameValid.firstName ||
                !this.state.nameValid.lastName
              }
            />
          </Grid.Column>
          <Grid.Column>
            <Button
              onClick={this.onCancelEditClick}
              content="Cancel"
              fluid
              primary
              style={{ background: "teal" }}
            />
          </Grid.Column>
        </Grid>
      ),
      no: (
        <Button
          onClick={this.close}
          content="OK"
          fluid
          primary
          style={{ background: "teal" }}
        />
      )
    };

    return (
      <Modal
        dimmer="inverted"
        open={isOpen}
        onOpen={this.open}
        trigger={this.props.trigger}
        centered={false}
        onClose={this.close}
        size="tiny"
      >
        <Segment textAlign="center" style={{ background: "AliceBlue" }}>
          <Header as="h2" textAlign="center">
            <Image src={require("../../current_test_icon.ico")} size="small" />{" "}
            Your Profile
          </Header>
          <Divider />

          <Segment stacked textAlign="center" style={{ background: "Azure" }}>
            <Image wrapped size="small" circular src={this.state.imageUrl} />
            {editNameConfig[this.state.isNameEdit]}
            <p>{this.props.email}</p>
            <Divider />
            {buttonConfig[this.state.isNameEdit]}
          </Segment>
          {this.errorSegment()}
        </Segment>
      </Modal>
    );
  }
}

export default YourProfile;
