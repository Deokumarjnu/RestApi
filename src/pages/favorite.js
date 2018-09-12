import React, { Component } from 'react';
import {Card} from '../components/card';
import {getBeers} from '../api';

import './favorite.m.css'
class Favorite extends Component {
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
      const favoriteBeers = beers.filter(beer => {
        if (beer.favorite===true) {
          return beer;
        }
      });
      this.setState({beers: favoriteBeers, loading: true});
    });
  }

  render() {
    if (!this.state.loading) {
      return <div className="container">Loading ...</div>
    }
    return (
      <div className="container">
        {
          this.state.beers.map(beer => {
            return <Card
              key={beer.id}
              beer={beer}
              onFavoriteToggle={this.fetchBeers} />
          })
        }
      </div>
    );
  }
}

export {Favorite}
