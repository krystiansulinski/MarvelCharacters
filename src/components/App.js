import React, { Component } from "react";
import Characters from "./Characters";
import API from "./API";
import { getLoadingIndicator } from "../utils/index";
import MyPagination from "./MyPagination";
import MyFooter from "./MyFooter";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { api: null };
    this.changePage = this.changePage.bind(this);
  }

  async componentDidMount() {
    const api = new API();
    await api.fetch();
    this.changePage(api);
  }

  changePage(api) {
    if (api) {
      this.setState({ api: null });
      this.setState({ api: api });
      console.log("changePage");
    }
  }

  render() {
    let elements = [];
    if (this.state && this.state.api) {
      elements.push(<Characters key="characters" api={this.state.api} />);
      elements.push(<MyPagination key="myPagination"
        changePage={this.changePage}
        api={this.state.api} />);
      elements.push(<MyFooter key="myFooter"
        attributionText={this.state.api.response.attributionText} />);
    }

    return (
      <div>
        {this.state && this.state.api && !this.state.api.isLoading
          ? elements.map(element => element)
          : getLoadingIndicator()}
      </div>
    );
  }
}

export default App;