import React, { Component } from "react";
import { getPicture, getCharacterDetails } from "../utils/index";

class Characters extends Component {
  constructor(props) {
    super(props);
    this.api = props.api;
  }

  render() {
    const api = this.api.response;
    if (api && api.data && api.data.results) {
      return (
        <div className="characters">
          {api.data.results.map(char => (
            <div className="character"
              key={"character#" + char.id}>
              <img
                className="image"
                key={char.id}
                src={getPicture(char.thumbnail)}
                alt={char.name}
                onClick={() => window.open(getCharacterDetails(char.urls))}
              />
              <div className="title" key={"tile#" + char.id}>
                {char.name}
              </div>
            </div>
          ))}
        </div>
      );
    }
  }
}

export default Characters;