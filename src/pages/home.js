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
      errorMsg:'',
    }
    this.fetchBeers = this.fetchBeers.bind(this);
  }

  componentDidMount() {
    this.fetchBeers()
  }

  fetchBeers() {
    this.setState({loading: true});
    getBeers(1,9).then(({result,error}) => {
      if (!error) {
        this.setState({beers: result});
      }
      else {
        this.setState({errorMsg:error})
      }
      this.setState({loading: false});
    });
  }

  render(){
    if (this.state.loading) {
      return <div className="container">Loading ...</div>
    }
    return (
      <div className="container">
        {
          !this.state.errorMsg ? this.state.beers.map(beer => {
            return <Card key={beer.id} beer={beer} onFavoriteToggle={this.fetchBeers}/>
          }) : <div>{this.state.errorMsg}</div>
        }
      </div>
    );
  }
}

export {Home}
