import React, { Component } from "react";
import { Input } from "semantic-ui-react";

class DefaultSearchBar extends Component {
  State = {
    isLoading: false,
    results: [],
    value: ""
  };

  render() {
    return (
      <Input
        onBlur={() => this.props.onSearchBlur()}
        icon="search"
        iconPosition="left"
        placeholder="Search..."
      />
    );
  }
}

export default DefaultSearchBar;
