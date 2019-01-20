import React, { Component } from 'react';
import Row from "./Row";
import { getGrouping } from "../utils/index"
// import InfiniteScroll from 'react-infinite-scroller';

class Gateway extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: null,
      currentLetter: "a",
    };
  }

  componentDidMount() {
    this.fetchData("https://gateway.marvel.com:443/v1/public/characters?apikey=5e70238c76e414c5a82a0abffe62b24c");
  }

  loadMore() {
    this.fetchData("https://gateway.marvel.com:443/v1/public/characters?nameStartsWith="
      + this.getNextLetter() + "bapikey=5e70238c76e414c5a82a0abffe62b24c");
  }

  fetchData(url) {
    return fetch(url).then(response => response.json())
      .then(json => this.setState({ loading: false, data: json }));
  }

  getNextLetter() {
    const letter = this.state.currentLetter;
    this.setState({ currentLetter: letter <= "z".charCodeAt(0) ? String.fromCharCode(letter.charCodeAt(0) + 1) : "a" });
    return this.state.currentLetter;
  }

  renderRows(requestResult) {
    if (requestResult.data) {
      const result = requestResult.data.results;
      console.log("res ", result);

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
    const { loading, data } = this.state;
    return (
      // <InfiniteScroll
      //   pageStart={0}
      //   loadMore={loadFunc}
      //   hasMore={true || false}
      //   loader={<div className="loader" key={0}>Loading ...</div>}
      // >
      <div>
        {loading ? "Loading..." : this.renderRows(data)}
      </div>
      // </InfiniteScroll >
    );
  }
}

export default Gateway;