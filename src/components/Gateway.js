import React, { Component } from 'react';
import Row from "./Row";
import { getGrouping, getRandomLetter } from "../utils/index"

class Gateway extends Component {
  constructor(props) {
    super(props);
    this.state = {
      publicKey: "apikey=5e70238c76e414c5a82a0abffe62b24c",
      getCharactersUrl: "https://gateway.marvel.com:443/v1/public/characters?",
      isLoading: true,
      currentLetter: "a",
      // error: false,
      // hasMore: true,
      // result: [],
    };

    //   // Infinite scrolling to be continued...
    //   window.onscroll = () => {
    //     if (this.state.error || this.state.isLoading || !this.state.hasMore) { return };
    //     const element = document.documentElement;
    //     if (window.innerHeight + element.scrollTop === element.offsetHeight) {
    //       this.loadData();
    //     }
    //   };
    // }

    // loadData() {
    //   this.setState({ isLoading: true }, () => {
    //     fetch(this.getUrl())
    //       .then(response => response.json())
    //       .then(json => {
    //         this.setState({
    //           isLoading: false,
    //           result: json,
    //           hasMore: this.state.currentLetter !== "z",
    //         })
    //       }).catch(err => {
    //         this.setState({
    //           error: err.message,
    //           isLoading: false,
    //         });
    //       })
    //   });
  }

  componentWillMount() {
    const uri = this.state.getCharactersUrl + "nameStartsWith=" + getRandomLetter() + "&" + this.state.publicKey;
    fetch(uri).then(response => response.json())
      .then(json => this.setState({ isLoading: false, result: json }));
  }

  renderRows(requestResult) {
    if (requestResult && requestResult.data) {
      const result = requestResult.data.results;
      const [row, col] = [4, result.length / 4];
      return (
        <div>
          {getGrouping(result, row, col).map(char => (
            <Row
              characters={[char[0], char[1], char[2], char[3], char[4]]}
              name={char[0] % col}
            />
          ))}
        </div>
      );
    }
  }

  render() {
    const { isLoading, result /*, hasMore*/ } = this.state;
    return (
      <div>
        {isLoading ? <h1 data-text={"......................."} className="center"><div className="......................."></div></h1> : this.renderRows(result)}
        {/* {!hasMore &&
          <div>The End</div>
        } */}
      </div>
    );
  }
}

export default Gateway;