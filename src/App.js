import React from "react";
import Header from "./Header";
import UserHint from "./UserHint";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
      hintText: "",
      gif: null
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
        gif: randomGif
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
          {/* Our stack of gif images */}
          {/* It's only going to render out video when we have a gif in the state, we can test for it using && */}
          {gif && (
            <video
              className="grid-item video"
              autoPlay
              loop
              src={gif.images.original.mp4}
            />
          )}
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
