import React, { Component } from 'react';
import Row from "./Row";
import { getGrouping, getRandomLetter, getLoadingIndicator, getGroupingFallback } from "../utils/index";

class Gateway extends Component {
  constructor(props) {
    super(props);
    this.publicKey = "apikey=5e70238c76e414c5a82a0abffe62b24c";
    this.charactersUrl = "https://gateway.marvel.com:443/v1/public/characters?";
    this.state = {
      isLoading: true,
      error: false,
      hasMore: true,
      result: null,
      currentLetter: null,
    };
  }

  async componentWillMount() {
    const randomLetter = getRandomLetter();
    this.setState({ currentLetter: randomLetter });

    const uri = this.charactersUrl + "nameStartsWith=" + randomLetter + "&" + this.publicKey;
    const response = await fetch(uri);
    const json = await response.json();
    this.setState({
      isLoading: false,
      result: json,
      error: response.status !== 200,
    });
  }

  renderRows() {
    const result = this.state.result.data.results;
    if (!this.state.error && result.length) {
      const [row, col] = [result.length / 5, result.length / 4];
      return (
        <div>
          {getGrouping(result, row, col).map(chars =>
            chars[0] ?
              <Row
                key={chars[0] % col}
                name={chars[0] % col}
                chars={chars}
              />
              : "")}
        </div>
      );
    }
  }

  renderRowsFallback() {
    return (
      <div>
        {getGroupingFallback().map(chars =>
          chars[0] ?
            <Row
              key={chars[0].name}
              chars={chars}
            />
            : "")}
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.state.isLoading ? getLoadingIndicator() : this.state.error ? this.renderRowsFallback() : this.renderRows()}
      </div>
    );
  }
}

export default Gateway;