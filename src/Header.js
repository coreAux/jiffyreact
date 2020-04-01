import React from "react";
import clearButton from "./images/close-icon.svg";

// We pick out our props inside the header component ew can pass down functions as props as well as things like number strings, arrays or objects
const Header = ({ clearSearch, hasResults }) => (
  <div className="header grid">
    {hasResults ? (
      <button onClick={clearSearch}>
        <img src={clearButton} alt="Clear" />
      </button>
    ) : (
      <h1 className="title">Jiffy</h1>
    )}
  </div>
);

export default Header;
