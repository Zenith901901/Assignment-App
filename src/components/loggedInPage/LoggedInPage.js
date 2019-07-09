import React, { Component } from "react";
import Add from "./Add";
import Public from "./Public";
import Private from "./Private";
import NavBar from "./NavBar";
import Home from "./Home";
import { Segment, Header, Container } from "semantic-ui-react";
import Axios from "axios";

class LoggedInPage extends Component {
  state = { activeItem: "add", userData: {} };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  setUserData = userData => {
    if (JSON.stringify(userData) !== JSON.stringify(this.state.userData)) {
      this.setState({ userData });
    }
  };

  userInfo = () => {
    Axios.get(`${this.props.dbUrl}/users/id/${this.props._id}`)
      .then(res => {
        this.setUserData(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const pageConfig = {
      add: (
        <Add
          _id={this.props._id}
          dbUrl={this.props.dbUrl}
          userInfo={this.userInfo}
        />
      ),
      private: <Private />,
      public: <Public />
    };

    this.userInfo();

    const userData = this.state.userData;
    console.log(userData);

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
        <Container text>
          <Segment
            style={{
              minHeight: 500,
              // background: "AliceBlue",
              marginTop: "4em"
            }}
            vertical
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
