import React, { Component } from "react";

class MyFooter extends Component {
  render() {
    return (
      <footer className="attribution">
        <a href="http://marvel.com" target="_blank" rel="noopener noreferrer">{this.props.attributionText}</a>
      </footer>
    );
  }
}

export default MyFooter;