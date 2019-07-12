import React, { Component } from "react";
import Add from "./Add";
import Board from "./Board";
import NavBar from "./NavBar";
import { Segment, Header, Container } from "semantic-ui-react";
import axios from "axios";

class LoggedInPage extends Component {
  state = {
    activeItem: localStorage.getItem("ActiveItem") || "add",
    userData: {}
  };

  handleItemClick = (e, { name }) => {
    localStorage.setItem("ActiveItem", name);
    this.setState({ activeItem: name });
  };

  setUserData = userData => {
    if (JSON.stringify(userData) !== JSON.stringify(this.state.userData)) {
      this.setState({ userData });
    }
  };

  userInfo = () => {
    axios
      .get(`${this.props.dbUrl}/users/${this.props._id}`)
      .then(res => {
        this.setUserData(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const pageConfig = {
      add: <Add _id={this.props._id} dbUrl={this.props.dbUrl} />,
      private: (
        <Board _id={this.props._id} type="private" dbUrl={this.props.dbUrl} />
      ),
      public: (
        <Board _id={this.props._id} type="public" dbUrl={this.props.dbUrl} />
      )
    };

    this.userInfo();

    const userData = this.state.userData;

    return (
      <NavBar
        handleItemClick={this.handleItemClick}
        activeItem={this.state.activeItem}
        changeState={this.props.changeState}
        email={userData.email}
        firstName={userData.firstName}
        lastName={userData.lastName}
        password={userData.password}
        userInfo={this.userInfo}
        _id={this.props._id}
        dbUrl={this.props.dbUrl}
      >
        <Container>
          <Segment
            style={{
              minHeight: 500,
              // background: "AliceBlue",
              marginTop: "4em"
            }}
            vertical
            centered
            textAlign="center"
          >
            {pageConfig[this.state.activeItem]}
          </Segment>
        </Container>
        <Segment
          style={{ minHeight: 200, background: "#1C1B23" }}
          textAlign="center"
          vertical
        >
          <Header inverted as="h1">
            Footer
          </Header>
        </Segment>
      </NavBar>
    );
  }
}

export default LoggedInPage;
