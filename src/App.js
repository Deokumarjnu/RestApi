import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Header} from './components/header';
import {getBeers, getFavoriteBeers} from './api';
import {Card} from './components/card';
import {Pagination} from './components/pagination'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      beers: [],
      loading: false,
      errorMsg:'',
      isPrevDisable:true,
      isNextDisable:false,
      page:1,
      per_page:9,
    }
    this.fetchBeers = this.fetchBeers.bind(this);
    this.fetchNextBeers = this.fetchNextBeers.bind(this);
    this.fetchPrevBeers = this.fetchPrevBeers.bind(this);
  }
  componentDidMount() {
    this.fetchBeers(this.state.page,this.state.per_page)
  }

  getBeers(page, per_page) {
    if (this.props.page_type==='home') {
      return getBeers(page, per_page);
    }
    if (this.props.page_type==='favorites') {
      return getFavoriteBeers(page, per_page);
    }

    return Promise.resolve({error:'Invalid Page Type'});
  }
  fetchNextBeers() {
    this.fetchBeers(this.state.page + 1);
  }

  fetchPrevBeers() {
    this.fetchBeers(this.state.page - 1);
  }

  fetchBeers(page) {
    this.setState({loading: true});

    this.getBeers(page, this.state.per_page).then(({result,error}) => {
      if (!error) {
        this.setState({
          isNextDisable: result.length !== 9,
          isPrevDisable: page === 1,
          loading: false,
          beers: result,
          page: page
        });
      }
      else {
        this.setState({
          errorMsg:error,
          loading: false
        })
      }
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
              return <Card key={beer.id} beer={beer} onFavoriteToggle={this.fetchBeers} page={this.state.page} per_page={this.state.per_page}/>
            })
          }
        </div>
        <div className="container">
          <Pagination
            page={this.state.page}
            per_page={this.state.per_page}
            fetchNextBeers={this.fetchNextBeers}
            fetchPrevBeers={this.fetchPrevBeers}
            isPrevDisable={this.state.isPrevDisable}
            isNextDisable={this.state.isNextDisable}/>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
