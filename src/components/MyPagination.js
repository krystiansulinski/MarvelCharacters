import React, { Component } from 'react';
import { Pagination } from 'react-bootstrap';
import API from "./API";

class MyPagination extends Component {
  constructor(props) {
    super(props);
    this.api = props.api;
    this.total = this.api.response.data.total;
    this.state = {
      currentPage: 1,
      charsPerPage: this.api.response.data.limit,
      offset: this.api.response.data.offset,
      pagination: null,
    };
    this.changePage = props.changePage;
  }

  async goToPage(page) {
    const offset = (page - 1) * this.state.charsPerPage
    this.setState({
      offset: offset,
      currentPage: Math.ceil(offset / this.state.charsPerPage),
    });
    const api = new API(offset);
    await api.fetch()
    this.changePage(api);
  }

  getPagination() {
    const p = this.state.currentPage;
    // const pagination = [<Pagination.Prev key={"prev"} onClick={() => this.goToPage(p - 1)} />];
    const pagination = [];
    const max = Math.ceil(this.total / this.state.charsPerPage);
    for (let i = 1; i <= max; i++) {
      pagination.push(<Pagination.Item key={i} onClick={() => this.goToPage(i)}>{i < 10?  "0" + i : i}</Pagination.Item>);
    }
    // pagination.push(<Pagination.Ellipsis key={"elipsis"} />);
    // pagination.push(<Pagination.Item key={max} onClick={() => this.goToPage(max)}>{max}</Pagination.Item>);
    // pagination.push(<Pagination.Next key={"next"} onClick={() => this.goToPage(p + 1)} />);
    return pagination;
  }

  render() {
    console.log("render: ", this.state.currentPage);
    return (
      <div className="paginationParent">
        <Pagination>
          {this.getPagination().map(page =>
            page
          )}
        </Pagination>
      </div>
    );
  }
}

export default MyPagination;