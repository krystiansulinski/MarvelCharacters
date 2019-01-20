import React, { Component } from 'react';

class Character extends Component {
  render() {
    return (
      <div className="container">
        <div key={this.props.name}>
          <img
            className="column image"
            src={this.props.src}
            alt={this.props.name}
            onClick={() => window.open(this.props.url)}
            onTap={() => window.open(this.props.url)}>
          </img>

          <div class="middle">
            <div class="title"
              onClick={() => window.open(this.props.url)}
              onTap={() => window.open(this.props.url)}>
              {this.props.name}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Character;