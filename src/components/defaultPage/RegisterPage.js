import React from "react";
import RegisterPageInputs from "./RegisterPageInputs";
import EmailValidator from "email-validator";
import axios from "axios";

class RegisterPage extends React.Component {
  state = {
    isOpen: false,
    userData: {},
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    formErrors: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      confirmPassword: ""
    },

    formValid: {
      email: true,
      password: true,
      firstName: true,
      lastName: true,
      confirmPassword: true
    }
  };

  open = () =>
    this.setState({
      isOpen: true,
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      confirmPassword: "",
      formValid: {
        email: true,
        password: true,
        firstName: true,
        lastName: true,
        confirmPassword: true
      }
    });

  close = () => {
    if (this.state.isOpen) {
      this.setState({
        isOpen: false
      });
    }
    this.props.hideModal();
  };

  validateForm = field => {
    let { userData, formErrors, formValid } = this.state;
    switch (field) {
      case "firstName": {
        const firstNameStr = this.state.firstName.trim();
        const nameArr = firstNameStr.split(" ");
        const nameLength = nameArr.length;
        if (firstNameStr.length === 0) {
          formValid[field] = false;
          formErrors[field] = "Please enter your first name";
        } else if (firstNameStr.length > 20) {
          formValid[field] = false;
          formErrors[field] = "first name Must be less then 20 Characters";
        } else if (/[^a-z' ']/i.test(firstNameStr)) {
          formValid[field] = false;
          formErrors[field] = "Invalid first name";
        } else if (nameLength > 1) {
          formValid[field] = false;
          formErrors[field] = "Must type only first name";
        }
        break;
      }
      case "lastName": {
        const lastNameStr = this.state.lastName.trim();
        const nameArr = lastNameStr.split(" ");
        const nameLength = nameArr.length;
        if (lastNameStr.length === 0) {
          formValid[field] = false;
          formErrors[field] = "Please enter your last name";
        } else if (lastNameStr.length > 20) {
          formValid[field] = false;
          formErrors[field] = "lats name Must be less then 20 Characters";
        } else if (/[^a-z' ']/i.test(lastNameStr)) {
          formValid[field] = false;
          formErrors[field] = "Invalid last name";
        } else if (nameLength > 1) {
          formValid[field] = false;
          formErrors[field] = "Must type only last name";
        }
        break;
      }
      case "email": {
        const emailStr = this.state.email;
        if (emailStr.length === 0) {
          formValid[field] = false;
          formErrors[field] = "Please enter your email";
        } else if (!EmailValidator.validate(emailStr)) {
          formValid[field] = false;
          formErrors[field] = "Invalid email";
        } else if (userData !== "") {
          formValid[field] = false;
          formErrors[field] = "Email already registered ";
        }
        break;
      }
      case "password": {
        const passwordStr = this.state.password;
        if (passwordStr.length < 8) {
          formValid[field] = false;
          formErrors[field] =
            "Please make sure password is longer than 8 characters";
        } else if (passwordStr.length > 30) {
          formValid[field] = false;
          formErrors[field] =
            "Please make sure password is shorter than 30 characters";
        } else if (/[^a-z0-9]/i.test(passwordStr)) {
          formValid[field] = false;
          formErrors[field] =
            "Password should only contain digits, uppercase characters or lowercase characters";
        }

        break;
      }
      case "confirmPassword": {
        const confirmPasswordStr = this.state.confirmPassword;
        if (confirmPasswordStr !== this.state.password) {
          formValid[field] = false;
          formErrors[field] = "Please make sure passwords match";
        }
        break;
      }
      default: {
        console.log("Invalid field");
        break;
      }
    }
    this.setState({ formErrors, formValid });
  };

  handleUserInput = e => {
    const field = e.target.name;
    const value = e.target.value;
    const formValid = this.state.formValid;
    formValid[field] = true;
    this.setState({ [field]: value, formValid });
  };

  onSignUpClick = () => {
    let getUrl = "";
    let postUrl = `${this.props.dbUrl}/users`;
    if (this.state.email === "") {
      getUrl = `${this.props.dbUrl}/users/nothing`;
    } else {
      getUrl = `${this.props.dbUrl}/users/${this.state.email}`;
    }
    axios
      .get(getUrl)
      .then(res => {
        let userData = res.data;
        console.log(userData);
        this.setState({ userData });
        this.validateForm("firstName");
        this.validateForm("lastName");
        this.validateForm("email");
        this.validateForm("password");
        this.validateForm("confirmPassword");
        if (
          this.state.formValid.email &&
          this.state.formValid.password &&
          this.state.formValid.firstName &&
          this.state.formValid.lastName &&
          this.state.formValid.confirmPassword
        ) {
          const firstNameStr = this.state.firstName.trim();
          const lastNameStr = this.state.lastName.trim();
          // str = str.replace(/\s+/g, " ").trim();
          const userInput = {
            firstName: firstNameStr,
            lastName: lastNameStr,
            email: this.state.email,
            password: this.state.password
          };
          axios
            .post(postUrl, userInput)
            .then(response => {
              userData = response.data;
              this.props.userUpdater(userData["_id"]);
              console.log(userData);
            })
            .catch(error => {
              console.log(error);
            });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <RegisterPageInputs
        showLogin={this.props.showLogin}
        isOpen={this.props.isOpen}
        open={this.open}
        close={this.close}
        handleUserInput={this.handleUserInput}
        onSignUpClick={this.onSignUpClick}
        formValid={this.state.formValid}
        formErrors={this.state.formErrors}
      />
    );
  }
}

export default RegisterPage;
