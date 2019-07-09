import React, { Component } from "react";
import Board from "./Board";
import Feed from "./Feed";
import Bookmarks from "./Bookmarks";
import NavBar from "./NavBar";
import Home from "./Home";
import { Segment, Header } from "semantic-ui-react";
import Axios from "axios";

class LoggedInPage extends Component {
  state = { activeItem: "home", userData: {} };

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
      home: <Home />,
      feed: <Feed />,
      board: <Board />,
      bookmarks: <Bookmarks />
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
        {pageConfig[this.state.activeItem]}
        <Segment
          style={{ minHeight: 300, background: "#1C1B23" }}
          textAlign="center"
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
