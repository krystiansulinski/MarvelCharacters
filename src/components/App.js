import React, { Component } from 'react';
import Characters from "./Characters";
import MyPagination from './MyPagination';

class App extends Component {
  render() {
    return (
      <div>
        <Characters />
        <MyPagination total="1491" offset="20" />
        <footer className="attribution">
          <a href="http://marvel.com" target="_blank">Data provided by Marvel. © 2019 MARVEL</a>
        </footer>
      </div >
    );
  }
}

export default App;