import sampleResponse from "../assets/sampleResponse";
import { ResponseFormat } from "./ResponseFormat";

class API {
  constructor(offset) {
    this.publicKey = "apikey=5e70238c76e414c5a82a0abffe62b24c";
    this.charactersUrl = "https://gateway.marvel.com:443/v1/public/characters?";
    this.response = null;
    this.isLoading = true;
    this.offset = offset || 0;
  }

  async fetch() {
    const url = this.charactersUrl + "offset=" + this.offset + "&" + this.publicKey;
    const response = await fetch(url);
    const json = (response.status === 401 && sampleResponse) || await response.json();
    this.response = new ResponseFormat(json);
    this.isLoading = false;
  }
}

export default API;