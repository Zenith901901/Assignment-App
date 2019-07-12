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
  Confirm
} from "semantic-ui-react";
import axios from "axios";

class PasswordChange extends Component {
  state = {
    password: "",
    confirmOpen: false,
    isOpen: false,
    newPass: "",
    oldPass: "",
    confirmNewPass: "",
    formErrors: { newPass: "", oldPass: "", confirmNewPass: "" },
    formValid: { newPass: true, oldPass: true, confirmNewPass: true }
  };

  confirmOpen = () => this.setState({ confirmOpen: true });
  confirmClose = () => this.setState({ confirmOpen: false });

  open = () =>
    this.setState({
      isOpen: true,
      password: this.props.password,
      newPass: "",
      oldPass: "",
      confirmNewPass: "",
      formValid: { newPass: true, oldPass: true, confirmNewPass: true }
    });

  close = () => {
    if (this.state.isOpen) {
      this.setState({ isOpen: false });
    }
  };

  validatePass(field) {
    const {
      oldPass,
      newPass,
      confirmNewPass,
      formErrors,
      formValid
    } = this.state;
    switch (field) {
      case "oldPass": {
        if (oldPass.length === 0) {
          formErrors[field] = "Please type your password";
          formValid[field] = false;
        } else if (oldPass !== this.state.password) {
          formErrors[field] = "Incorrect password";
          formValid[field] = false;
        }
        if (!formValid[field]) {
          this.setState({ formErrors, formValid });
        }
        break;
      }
      case "newPass": {
        if (newPass.length < 8) {
          formValid[field] = false;
          formErrors[field] =
            "Please make sure password is longer than 8 characters";
        } else if (newPass.length > 30) {
          formValid[field] = false;
          formErrors[field] =
            "Please make sure password is shorter than 30 characters";
        } else if (/[^a-z0-9]/i.test(newPass)) {
          formValid[field] = false;
          formErrors[field] =
            "Password should only contain digits, uppercase characters or lowercase characters";
        }
        if (!formValid[field]) {
          this.setState({ formErrors, formValid });
        }
        break;
      }
      case "confirmNewPass": {
        if (confirmNewPass !== newPass) {
          formValid[field] = false;
          formErrors[field] = "Please make sure passwords match";
          this.setState({ formErrors, formValid });
        }
        break;
      }
      default: {
        console.log("Invalid field");
        break;
      }
    }
  }

  onPassChangeClick = () => {
    console.log(
      this.state.oldPass,
      this.state.newPass,
      this.state.confirmNewPass
    );
    this.validatePass("oldPass");
    this.validatePass("newPass");
    this.validatePass("confirmNewPass");
    const allValid =
      this.state.formValid.oldPass &&
      this.state.formValid.newPass &&
      this.state.formValid.confirmNewPass;

    if (allValid) {
      this.confirmOpen();
    }
  };

  confirmConfirm = () => {
    axios
      .get(`${this.props.dbUrl}/users/${this.props._id}`)
      .then(res => {
        let userData = res.data;
        userData["password"] = this.state.newPass;
        axios
          .put(`${this.props.dbUrl}/users/${this.props._id}`, userData)
          .then(response => {
            console.log("Password updated");
            this.props.userInfo();
          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch(err => {
        console.log(err);
      });
    this.confirmClose();
    this.close();
  };

  formErrors = field => {
    if (!this.state.formValid[field]) {
      return <List.Item> {this.state.formErrors[field]}</List.Item>;
    }
  };

  errorSegment = () => {
    if (
      !this.state.formValid.oldPass ||
      !this.state.formValid.newPass ||
      !this.state.formValid.confirmNewPass
    ) {
      return (
        <Segment raised style={{ background: "AliceBlue" }} textAlign="left">
          <List bulleted>
            {this.formErrors("oldPass")}
            {this.formErrors("newPass")}
            {this.formErrors("confirmNewPass")}
          </List>
        </Segment>
      );
    }
  };

  render() {
    const { isOpen } = this.state;
    const valid = { newPass: true, oldPass: true, confirmNewPass: true };
    const allValid =
      this.state.formValid.oldPass &&
      this.state.formValid.newPass &&
      this.state.formValid.confirmNewPass;

    return (
      <React.Fragment>
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
              <Image
                src={require("../../current_test_icon.ico")}
                size="small"
              />{" "}
              Change Your Password
            </Header>
            <Divider />

            <Segment stacked>
              <Form size="large">
                <Form.Input
                  error={!this.state.formValid.oldPass}
                  onChange={e =>
                    this.setState({ oldPass: e.target.value, formValid: valid })
                  }
                  fluid
                  icon="lock"
                  iconPosition="left"
                  type="password"
                  placeholder="Old Password"
                />

                <Form.Input
                  error={!this.state.formValid.newPass}
                  onChange={e =>
                    this.setState({ newPass: e.target.value, formValid: valid })
                  }
                  fluid
                  icon="lock"
                  iconPosition="left"
                  type="password"
                  placeholder="New Password"
                />

                <Form.Input
                  error={!this.state.formValid.confirmNewPass}
                  onChange={e =>
                    this.setState({
                      confirmNewPass: e.target.value,
                      formValid: valid
                    })
                  }
                  fluid
                  icon="lock"
                  iconPosition="left"
                  type="password"
                  placeholder="Confirm New Password"
                />
              </Form>
              <Divider />

              <Button
                onClick={this.onPassChangeClick}
                content="Submit"
                fluid
                primary
                style={{ background: "teal" }}
                disabled={!allValid}
              />
            </Segment>

            {this.errorSegment()}
          </Segment>
        </Modal>
        <Confirm
          size="tiny"
          open={this.state.confirmOpen}
          onCancel={this.confirmClose}
          onConfirm={this.confirmConfirm}
        />
      </React.Fragment>
    );
  }
}

export default PasswordChange;
