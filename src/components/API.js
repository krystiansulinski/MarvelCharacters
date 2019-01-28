import sampleResponse from "../assets/sampleResponse";
import sampleResponse2 from "../assets/sampleResponse2";
import sampleResponse3 from "../assets/sampleResponse3";
import sampleResponse4 from "../assets/sampleResponse4";
import { ResponseFormat } from "./ResponseFormat";

class API {
  constructor(offset) {
    this.publicKey = "apikey=5e70238c76e414c5a82a0abffe62b24c";
    this.charactersUrl = "https://gateway.marvel.com:443/v1/public/characters?";
    this.response = null;
    this.isLoading = true;
    this.offset = 0 <= offset ? offset : 0;

    switch (this.offset) {
      case 0: this.sampleResponse = sampleResponse; break;
      case 20: this.sampleResponse = sampleResponse2; break;
      case 40: this.sampleResponse = sampleResponse3; break;
      case 60: this.sampleResponse = sampleResponse4; break;
      default: this.sampleResponse = sampleResponse; break;
    }

    // console.log("name: ", this.sampleResponse.data.results[0].name);
  }

  async fetch() {
    const url = this.charactersUrl + "offset=" + this.offset + "&" + this.publicKey;
    const response = await fetch(url);
    const json = (response.status === 401 && this.sampleResponse ) || await response.json();
    this.response = new ResponseFormat(json);
    this.isLoading = false;
  }
}

export default API;