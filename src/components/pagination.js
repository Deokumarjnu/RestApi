import React, { Component } from 'react';
import './pagination.m.css';

class Pagination extends Component {
  constructor(props) {
    super(props);
    this.prevPage = this.prevPage.bind(this)
    this.nextPage = this.nextPage.bind(this)
  }

  prevPage() {
    this.props.fetchPrevBeers();
  }

  nextPage() {
    this.props.fetchNextBeers();
  }

  render() {
    return (
      <div className="container pagination">
        <button className="pagination__button" onClick={this.prevPage} disabled={this.props.isPrevDisable?true:false}>
          <i className="fa fa-angle-double-left"></i>
        </button>
        <button className="pagination__button" onClick={this.nextPage} disabled={this.props.isNextDisable?true:false}>
          <i className="fa fa-angle-double-right"></i>
        </button>
      </div>
    )
  }
}

export {Pagination}
