import React, { Component } from "react";
import ReactDOM from "react-dom";
import { getPicture, getPictureIncredible, getCharacterDetails } from "../utils/index";
import { Button } from 'react-bootstrap';
import API from "./API";

class Modal extends Component {
  constructor(props) {
    super(props);
    this.modalRoot = document.getElementById('modal-root');
    this.el = document.createElement('div');
  }

  componentDidMount() {
    this.modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    this.modalRoot.removeChild(this.el);
  }

  render() {
    return ReactDOM.createPortal(
      this.props.children,
      this.el,
    );
  }
}

class Characters extends Component {
  constructor(props) {
    super(props);
    this.api = props.api;
    this.state = { showModal: false };
    this.handleShow = this.handleShow.bind(this);
    this.handleHide = this.handleHide.bind(this);
  }

  async handleShow(id) {
    console.log("id: ", id);
    this.setState({ showModal: true, modalText: await this.getDetails(id) });
  }

  handleHide() {
    this.setState({ showModal: false });
  }

  async getDetails(id) {
    if (this.api && this.api.response && this.api.response.data && this.api.response.data.results) {
      let char = this.api.response.data.results.filter(result => result.id === id)[0];
      let details = [];

      details.push(
        <div className="characters">
          <div className="character"
            key={"character#" + char.id}>
            <img
              className="image"
              key={char.id}
              src={getPictureIncredible(char.thumbnail)}
              alt={char.name}
              onClick={() => window.open(getCharacterDetails(char.urls))}
            />
            <div className="title" key={"tile#" + char.id}>
              {char.name}
            </div>
          </div>
        </div>
      );

      if (char.description !== "") {
        details.push(<div key={char.description} className="charDescription">{char.description}</div>);
      }

      const comics = new API();
      await comics.fetchComics(char.id);
      console.log("comics: ", comics);
      const results = comics && comics.response && comics.response.data && comics.response.data.results;
      if (results) {
        results.forEach(result => {
          details.push(
            <a className="charComics"
              href={result.urls && result.urls[0].url}
              key={result.id}
              target="_blank"
              rel="noopener noreferrer">
              {result.title}
            </a>);
          details.push(<div className="comicsDescription">{result.description}</div>);
        });
      }


      return details;
    }
  }

  render() {
    const modal = this.state.showModal ? (
      <Modal>
        <div className="modal">
          {this.state.modalText.map(text =>
            text
          )}
          <Button bsStyle="danger" onClick={this.handleHide}>Go back</Button>
        </div>
      </Modal>
    ) : null;

    const api = this.api.response;
    if (api && api.data && api.data.results) {
      return (
        <div className="characters">
          {api.data.results.map(char => (
            <div className="character"
              key={"character#" + char.id}>
              <img
                className="image"
                key={char.id}
                src={getPicture(char.thumbnail)}
                alt={char.name}
                onClick={() => this.handleShow(char.id)}
              />
              <div className="title" key={"tile#" + char.id}>
                {char.name}
              </div>
              <div className="app">
                {modal}
              </div>
            </div>
          ))}
        </div>
      );
    }
  }
}

export default Characters;