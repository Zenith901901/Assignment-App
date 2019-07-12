import React from "react";
import DefaultPage from "./defaultPage/DefaultPage";
import LoggedInPage from "./loggedInPage/LoggedInPage";

class App extends React.Component {
  state = {
    isLoggedIn: "no",
    _id: "",
    dbUrl: "http://localhost:8080"
  };

  userUpdater = _id => {
    const data = _id;
    localStorage.setItem("LoginData", data);
    this.setState({ isLoggedIn: "yes", _id: _id });
  };

  changeState = () => {
    localStorage.removeItem("LoginData");
    localStorage.removeItem("ActiveItem");
    this.setState({ isLoggedIn: "no" });
  };

  componentDidMount() {
    const data = localStorage.getItem("LoginData");
    if (data) {
      this.setState({ isLoggedIn: "yes", _id: data });
    }
  }

  render() {
    const logInConfig = {
      no: (
        <DefaultPage dbUrl={this.state.dbUrl} userUpdater={this.userUpdater} />
      ),
      yes: (
        <LoggedInPage
          dbUrl={this.state.dbUrl}
          changeState={this.changeState}
          _id={this.state._id}
        />
      )
    };

    return (
      <React.Fragment>{logInConfig[this.state.isLoggedIn]}</React.Fragment>
    );
  }
}

export default App;
