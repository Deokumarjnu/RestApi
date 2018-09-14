import React, { Component } from 'react';
import './card.m.css';
import {setFavorite} from '../api';

class Card extends Component {
  constructor(props) {
    super(props);
    this.markUnmarkFavorite = this.markUnmarkFavorite.bind(this);
  }

  markUnmarkFavorite() {
    setFavorite(this.props.beer.id).then(() => {
      this.props.onFavoriteToggle(this.props.page, this.props.per_page);
    });
  }
  render() {
    return (
      <div className="card">
        <div className="star card__star">
          <button onClick={this.markUnmarkFavorite} className="star__button"><i className={`fa fa-star ${this.props.beer.favorite===true? 'checked':''}`}></i></button>
        </div>
        <div className="card__image">
          <img src={this.props.beer.image_url} className="cardImage" />
        </div>
        <div className="content card__content">
          <h2 className="content__heading">{this.props.beer.name}</h2>
          <p>{this.props.beer.description}</p>
        </div>
      </div>
    )
  }
}
export {Card}
