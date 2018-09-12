import React, { Component } from 'react';
import {Card} from '../components/card';
import {getBeers} from '../api';

import './home.m.css'
class Home extends Component {
  constructor() {
    super();
    this.state = {
      beers: [],
      loading: false,
    }
    this.fetchBeers = this.fetchBeers.bind(this);
  }

  componentDidMount() {
    this.fetchBeers()
  }

  fetchBeers() {
    getBeers(1,9).then(beers => {
      this.setState({beers: beers, loading: true});
    });
  }

  render(){
    if (!this.state.loading) {
      return <div className="container">Loading ...</div>
    }
    return (
      <div className="container">
        {
          this.state.beers.map(beer => {
            return <Card key={beer.id} beer={beer} onFavoriteToggle={this.fetchBeers}/>
          })
        }
      </div>
    );
  }
}

export {Home}
