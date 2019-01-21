import React, { Component } from 'react';
import Character from "./Character"

class Row extends Component {
  render() {
    if (this.props.characters) {
      return (
        <div className="row" key={this.props.name}>
          {this.props.characters.map(char => (
            <Character
              src={char && char.thumbnail && this.getPictureSrc(char.thumbnail)}
              url={char && char.urls && this.getDetails(char.urls)}
              key={char && char.id}
              name={char && char.name}
            />
          ))}
        </div>
      );
    }
  }

  getDetails(urls) {
    return urls && urls[1] && urls[1].type === "wiki" ? urls[1].url : urls[0].url;
  }

  getPictureSrc(thumbnail) {
    return thumbnail.path + "/landscape_amazing." + thumbnail.extension;
  }
}

export default Row;