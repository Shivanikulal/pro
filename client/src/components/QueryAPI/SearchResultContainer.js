
import React, { Component } from "react";
import Search from "./Search";
import Results from "./Results";
import API from "../../Utils/API";

class SearchResultContainer extends Component {
  state = {
    search: "",
    results: []
  };

  // When this component mounts, search the Giphy API for pictures of kittens
  componentDidMount() {
    this.searchGiphy("cialis");
  }

  searchGiphy = query => {
    API.search(query)
      .then(res => this.setState({ results: res.data.nlmRxImages[0].imageUrl}))
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    console.log("name: "+ name);
    console.log("value: "+ value);
    this.setState({
      [name]: value
    });
  };

  // When the form is submitted, search the Giphy API for `this.state.search`
  handleFormSubmit = event => {
    event.preventDefault();
    this.searchGiphy(this.state.search);
    console.log(this.state.search);
  };

  render() {
    return (
      <div>
        <Search
          search={this.state.search}
          handleFormSubmit={this.handleFormSubmit}
          handleInputChange={this.handleInputChange}
        />
        <Results results={this.state.results} />
      </div>
    );
  }
}

export default SearchResultContainer;