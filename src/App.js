import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Header} from './components/header';
import {Home} from './pages/home';
import {Favorite} from './pages/favorite';

class App extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <Header />
        { this.props.page_type==='home' ? <Home /> : <Favorite /> }
      </React.Fragment>
    );
  }
}

export default App;
