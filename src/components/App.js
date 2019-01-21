import React, { Component } from 'react';
import Gateway from "./Gateway";

class App extends Component {
  render() {
    return (
      <div>
        <Gateway />
        <footer className="attribution"> {"Data provided by Marvel. © 2014 Marvel"}</footer>
      </div>
    );
  }
}

export default App;
