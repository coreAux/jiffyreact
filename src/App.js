import React from "react";
import Header from "./Header";
import UserHint from "./UserHint";

class App extends React.Component {
  constructor(prop) {
    super(prop);
    this.state = {
      searchTerm: "",
      hintText: ""
    };
  }

  handleChange = event => {
    const { value } = event.target;
    // By setting the searchTerm in our state and also using that on our input as the value we have created what is called a controlled input
    this.setState((prevState, props) => ({
      // We take our old props and spread them out here
      ...prevState,
      // and then we overwrite the ones we want after
      searchTerm: value,
      // We set the hintText only when we have more than two characters in our input otherwise we make it blank
      hintText: value.length > 2 ? `Hit enter to search ${value}` : ""
    }));
  };

  handleKeyPress = event => {
    const { value } = event.target;
    // When we have 2 or more characters in our search box and we have also pressed enterl, we then want to run a search
    if (value.length > 2 && event.key === "Enter") {
      alert(`search for ${value}`);
    }
    console.log(event.key);
  };

  render() {
    const { searchTerm } = this.state;

    return (
      <div className="page">
        <Header />
        <div className="search grid">
          {/* Our stack of gif images */}
          <input
            className="input grid-item"
            placeholder="Type something"
            onChange={this.handleChange}
            onKeyPress={this.handleKeyPress}
            value={searchTerm}
          />
        </div>
        <UserHint {...this.state} />
      </div>
    );
  }
}

export default App;
