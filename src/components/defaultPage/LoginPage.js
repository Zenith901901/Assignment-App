import React, { Component } from "react";
import EmailValidator from "email-validator";
import LoginPageInputs from "./LoginPageInputs";
import axios from "axios";

class LoginPage extends Component {
  state = {
    isOpen: false,
    userData: "",
    _id: "",
    email: "",
    password: "",
    formErrors: { email: "", password: "" },
    formValid: { email: true, password: true }
  };

  open = () => {
    this.setState({
      isOpen: true,
      email: "",
      password: "",
      formValid: { email: true, password: true }
    });
  };

  close = () => {
    if (this.state.isOpen) {
      this.setState({
        isOpen: false
      });
    }
    this.props.hideModal();
  };

  validateForm = field => {
    let { userData, formErrors, formValid, _id } = this.state;
    switch (field) {
      case "email": {
        const emailStr = this.state.email;
        if (emailStr.length === 0) {
          formValid[field] = false;
          formErrors[field] = "Please enter your email";
        } else if (!EmailValidator.validate(emailStr)) {
          formValid[field] = false;
          formErrors[field] = "Invalid email";
        } else if (userData === "") {
          formValid[field] = false;
          formErrors[field] = "No account from this ID, please Sign Up";
        }
        break;
      }
      case "password": {
        const passwordStr = this.state.password;
        if (passwordStr.length === 0) {
          formValid[field] = false;
          formErrors[field] = "Please enter your password";
        } else if (formValid.email === true) {
          if (userData[field] !== passwordStr) {
            formValid[field] = false;
            formErrors[field] = "Incorrect password";
          } else {
            _id = userData["_id"];
          }
        }
        break;
      }
      default: {
        console.log("Invalid field");
        break;
      }
    }
    this.setState({ formErrors, formValid, _id });
  };

  onLoginClick = () => {
    let url = "";
    if (this.state.email === "") {
      url = `${this.props.dbUrl}/users/nothing`;
    } else {
      url = `${this.props.dbUrl}/users/${this.state.email}`;
    }
    axios
      .get(url)
      .then(res => {
        const userData = res.data;
        console.log(userData);
        this.setState({ userData });
        this.validateForm("email");
        this.validateForm("password");
        if (this.state.formValid.email && this.state.formValid.password) {
          this.props.userUpdater(this.state._id);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleUserInput = e => {
    const field = e.target.name;
    const value = e.target.value;
    const formValid = this.state.formValid;
    formValid[field] = true;
    this.setState({ [field]: value, formValid });
  };

  render() {
    return (
      <LoginPageInputs
        showRegister={this.props.showRegister}
        isOpen={this.props.isOpen}
        open={this.open}
        close={this.close}
        handleUserInput={this.handleUserInput}
        onLoginClick={this.onLoginClick}
        formValid={this.state.formValid}
        formErrors={this.state.formErrors}
      />
    );
  }
}

export default LoginPage;
