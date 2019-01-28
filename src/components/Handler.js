import React, { Component } from "react";
import { Button } from 'react-bootstrap';
import API from "./API";
import Character from './Character';
import Moment from 'react-moment';
import Modal from "./Modal";

class Handler extends Component {
  constructor(props) {
    super(props);
    this.api = props.api;
    this.state = { showModal: false };
    this.handleShow = this.handleShow.bind(this);
    this.handleHide = this.handleHide.bind(this);
  }

  async handleShow(id) {
    this.setState({
      showModal: true,
      modal: await this.getDetails(id)
    });
  }

  handleHide() {
    this.setState({ showModal: false });
  }

  async getComics(characterId) {
    const comics = new API();
    await comics.fetchComics(characterId);
    return comics && comics.response && comics.response.data && comics.response.data.results;
  }

  async getDetails(id) {
    const api = this.api;
    const respone = api.response;
    const result = api && respone && respone.data && respone.data.results;
    if (result) {
      const character = result.filter(result => result.id === id)[0];
      let details = [];
      const comics = await this.getComics(character.id);
      if (comics) {
        for (let i = 0; i < comics.length && i < 3; i++) {
          details.push(this.createDetails(comics[i], character));
        }
      }
      return details;
    }
  }

  createDetails(com, character) {
    return <div class="three">
      <Character className={"comicsImage"} key={"co" + com.id} id={com.id} src={com.thumbnail} imageSize="portrait_xlarge" name={com.title} onClick={() => window.open(com.urls[0].url)} parentClassName="" />
      <a className="comicsTitle" href={com.urls && com.urls[0].url} key={com.id} target="_blank" rel="noopener noreferrer">
        <div className="title" key={"tile#" + character.id}>
          {com.title}
        </div>
        {com.title} {" | "}
        <Moment format="MMMM YYYY">
          {com.modified}
        </Moment>
        {" | $"}{com.prices[0].price}
      </a>
      <div className="comDesc">
        {com.description && com.description.substr(0, 400) + " [...]"}
      </div></div>;
  }

  render() {
    const modal = this.state.showModal ? (
      <Modal>
        <div id="modalbar" className="modal">
          {this.state.modal.map(content => content)}
          <Button bsStyle="danger" className="closeButton" onClick={this.handleHide}>Close</Button>
        </div>
      </Modal>
    ) : null;

    const api = this.api.response && this.api.response.data && this.api.response.data.results;
    if (api) {
      return (
        <div className="characters">
          {api.map(char =>
            <Character
              className={"image"}
              key={char.id}
              id={char.id}
              src={char.thumbnail}
              name={char.name}
              imageSize={"landscape_amazing"}
              parentClassName="character"
              onClick={() => this.handleShow(char.id)} />
          )}
          <div>
            {modal}
          </div>
        </div>
      );
    }
  }
}

export default Handler;