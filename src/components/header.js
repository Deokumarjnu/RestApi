import React, { Component } from 'react';
import './header.m.css';

class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="header">
        <h1 className="heading">Beans Love Bears</h1>
        <ul className="list">
          <li className="list__item"><a href="#" className="menu-link">Home</a></li>
          <li className="list__item"><a href = "#" className="menu-link">Favorite</a></li>
        </ul>
      </div>
    )
  }
}

export {Header}
