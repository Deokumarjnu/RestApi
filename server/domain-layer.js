const punkApi = require('./punk-api');
var users = {};

function addFavorites(beers, user_id) {
  const favorites = users[user_id];
  return beers.map(beer => {
    beer.description = beer.description.substr(0,100);
    if (!favorites) {
      beer.favorite=false;
      return beer;
    }
    beer.favorite=favorites.has(beer.id.toString());
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

function favorites(id, user_id) {
  if (users[user_id]) {
    if (users[user_id].has(id)) {
      users[user_id].delete(id);
    } else {
      users[user_id].add(id);
    }
  }
  else {
    users[user_id] = new Set([id]);
  }
  return users[user_id];
}

module.exports = {
  getBeers,
  favorites
}
