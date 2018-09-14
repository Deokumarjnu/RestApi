import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Header} from './components/header';
import {Home} from './pages/home';
import {Favorite} from './pages/favorite';
import {getBeers, getFavoriteBeers} from './api';
import {Card} from './components/card';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      beers: [],
      loading: false,
      errorMsg:'',
      page:1,
      per_page:9,
    }
    this.fetchBeers = this.fetchBeers.bind(this);
  }
  componentDidMount() {
    this.fetchBeers(this.state.page,this.state.per_page)
  }
   getBeers() {
    if (this.props.page_type==='home') {
      return getBeers(1,9);
    }
    if (this.props.page_type==='favorites') {
      return getFavoriteBeers(1,9);
    }

    return Promise.resolve({error:'Invalid Page Type'});

  }
  fetchBeers(page, per_page) {
    this.setState({loading: true, page:page, per_page, per_page});
    this.getBeers(page, per_page).then(({result,error}) => {
      if (!error) {
        this.setState({beers: result});
      }
      else {
        this.setState({errorMsg:error})
      }
      this.setState({loading: false});
    });
  }

  render() {
    return (
      <React.Fragment>
        <Header />
        <div className = "container threeColLayout">
          {this.state.loading && <div className="loading">Loading ...</div>}
          {this.state.errorMsg && <div className="error">{this.state.errorMsg}</div>}
          {
            this.state.beers && this.state.beers.map(beer => {
              return <Card key={beer.id} beer={beer} onFavoriteToggle={this.fetchBeers}/>
            })
          }
        </div>
      </React.Fragment>
    );
  }
}

export default App;
