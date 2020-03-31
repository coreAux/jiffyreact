import React from "react";
import Header from "./Header";
import UserHint from "./UserHint";
import Gif from "./Gif";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
      hintText: "",
      gif: null,
      gifs: []
    };
  }

  // We want a function that searches the Giphy API using fetch and puts the search term into the query url and then we can do something with the results
  // We can also write async methods into our components that lets us the async/await style of function
  searchGiphy = async searchTerm => {
    const API_KEY = "6p7rYjivDzeZL9ke1T2jA5MFuswaRZqP";

    const randomChoice = arr => {
      const randIndex = Math.floor(Math.random() * arr.length);
      return arr[randIndex];
    };

    try {
      const response = await fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${searchTerm}&limit=50&offset=0&rating=PG-13&lang=en`
      );
      const { data } = await response.json();

      // Here we grab a random result from our images
      const randomGif = randomChoice(data);

      this.setState((prevState, props) => ({
        ...prevState,
        gif: randomGif,
        // Here we use our spread to take the previous gifs and spread them out and then add our new random gif onto the end
        gifs: [...prevState.gifs, randomGif]
      }));
      console.log(data.data);
    } catch (error) {}
  };

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
      // Here we call our searchGiphy function using the search term
      this.searchGiphy(value);
    }
    console.log(event.key);
  };

  render() {
    const { searchTerm, gif } = this.state;

    return (
      <div className="page">
        <Header />
        <div className="search grid">
          {/* Here we loop over our array of gifs from our state and we create multiple videos from it*/}
          {this.state.gifs.map(gif => (
            <Gif {...gif} />
          ))}

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
