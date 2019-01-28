import React, { Component } from 'react';
import { Pagination } from 'react-bootstrap';

// bootstrapUtils.addStyle(Button, 'custom');

class MyPagination extends Component {
  constructor(props) {
    super(props);
    this.total = props.total;
    this.state = {
      currentPage: 1,
      charsPerPage: props.offset,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id)
    });
  }

  render() {
    const { currentPage, charsPerPage } = this.state;
    const lastIndex = currentPage * charsPerPage;
    const firstIndex = lastIndex - charsPerPage;

    // const renderTodos = currentTodos.map((todo, index) => {
    //   return <li key={index}>{todo}</li>;
    // });

    return (
      <div className="paginationParent">
        <Pagination >
          <Pagination.Prev />
          <Pagination.Item>{1}</Pagination.Item>
          <Pagination.Item>{2}</Pagination.Item>
          <Pagination.Ellipsis />
          <Pagination.Item>{4}</Pagination.Item>
          <Pagination.Next />
        </Pagination>
      </div>
    );
  }
}

export default MyPagination;