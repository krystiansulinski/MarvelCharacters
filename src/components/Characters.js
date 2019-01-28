import React, { Component } from "react";
import { getLoadingIndicator, getPictureSrc, getCharacterDetails } from "../utils/index";
import API from "./API";

class Characters extends Component {
  async componentDidMount() {
    const api = new API();
    await api.fetch();
    this.setState({ api: api });
  }

  renderImages() {
    const api = this.state.api.response;
    if (api && api.data && api.data.results) {
      return (
        <div className="characters">
          {api.data.results.map(char => (
            <div className="character"
              key={"character#" + char.id}>
              <img
                className="image"
                key={char.id}
                src={getPictureSrc(char.thumbnail)}
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

  render() {
    if (this.state) {
      return (
        <div>
          {this.state.api.isLoading ? getLoadingIndicator() : this.renderImages()}
        </div>
      );
    }
    return null;
  }
}

export default Characters;