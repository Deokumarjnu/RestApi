import React from 'react';
import './card.m.css';

const Card = (props) => {
  return (
    <div className="card card-1">
      <div className="card__start">
        <i className="fa fa-star card--star"></i>
      </div>
      <div>
        <img src={props.beer.image_url} className="cardImage" />
      </div>
      <div className="content">
        <h2 className="content__heading">{props.beer.name}</h2>
        <p>{props.beer.description}</p>
      </div>
    </div>
  )
}

export {Card}
