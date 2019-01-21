import React, { Component } from 'react';
import Character from "./Character";
import { getCharacterDetails, getPictureSrc } from "../utils/index";

class Row extends Component {
  render() {
    if (this.props.chars) {
      return (
        <div className="row">
          {this.props.chars.map(char => (
            char ?
              <Character
                key={char.id}
                name={char.name}
                src={getPictureSrc(char.thumbnail)}
                url={getCharacterDetails(char.urls)}
              />
              : ""))}
        </div>
      );
    }
  }
}

export default Row;