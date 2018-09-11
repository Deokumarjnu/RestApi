const punkApi = require('./punk-api');
var users = {};

function addFavorites(beers, user_id) {
  const favorites = users[user_id];

  return beers.map(beer => {
    if (!favorites) {
      beer.favorite=false;
      return beer;
    }
    beer.favorite=favorites.has(beer.id);
    return beer;
  });
}

function getBeers(page, per_page, user_id) {
 return punkApi.getBeers(page, per_page).then(({result,error}) => {
    if (error) {
      return {
        'error':'unable to fetch beer'
      };
    }

    const beers = result.map(({id,name,description,image_url}) => {
      return {id,name,description,image_url};
    });

    beersWithFavorites = addFavorites(beers, user_id);
    return {'result': beersWithFavorites};
  });
}


module.exports = {
  getBeers
}
