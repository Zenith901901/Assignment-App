import React from "react";
import DefaultPage from "./defaultPage/DefaultPage";
import LoggedInPage from "./loggedInPage/LoggedInPage";

class App extends React.Component {
  state = {
    isLoggedIn: "no",
    _id: "5d24865befe2de25a9caedff",
    dbUrl: "http://localhost:3000"
  };

  userUpdater = _id => {
    this.setState({ isLoggedIn: "yes", _id: _id });
  };

  changeState = () => {
    this.setState({ isLoggedIn: "no" });
  };

  render() {
    console.log(this.state._id);
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
