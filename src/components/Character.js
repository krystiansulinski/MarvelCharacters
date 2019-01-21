import React, { Component } from 'react';

class Character extends Component {
  render() {
    if (this.props) {
      const [url, name, src] = [this.props.url, this.props.name, this.props.src];
      if (url && name && src) {
        return (
          <div className="container">
            <img
              alt={name}
              className="column image"
              src={src}
              onClick={() => window.open(url)}
              onTap={() => window.open(url)}>
            </img>

            <div className="middle">
              <div
                className="title"
                onClick={() => window.open(url)}
                onTap={() => window.open(url)}>
                {name}
              </div>
            </div>
          </div>
        );
      }
    }
  }
}

export default Character;