import React, { Component } from 'react';
import Character from "./Character"

class Row extends Component {
  render() {
    return (
      <div className="row" key={this.props.name}>
        {this.props.characters.map(char => (
          <Character
            src={char.thumbnail.path + "/landscape_amazing." + char.thumbnail.extension}
            key={char.name}
            name={char.name}
            url={this.getDetails(char.urls)}
          />
        ))}
      </div>
    );
  }

  getDetails(urls) {
    return urls && urls[1] && urls[1].type === "wiki" ? urls[1].url : urls[0].url;
  }
}


export default Row;