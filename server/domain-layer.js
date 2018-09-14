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

function getBeers({page=1, per_page=9, user_id, favorite_ids}) {
 return punkApi.getBeers({page, per_page, favorite_ids}).then(({result,error}) => {
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

function setFavorites(id, user_id) {
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
  console.log(users[user_id])
  return users[user_id];
}

async function getFavoriteBeers(user_id, {page = 1, per_page = 9}) {
  if (!user_id) {
    return {'result': []};
  }

  const favorite_ids = users[user_id] && Array.from(users[user_id]).join('|')

  if (!favorite_ids) {
    return {'result': []}
  }

  return await getBeers({page, per_page, user_id, favorite_ids}).then(({result,error}) => {

    if (!error) {
      return {'result': result};
    }
    return {'error':'unable to fetch beer'};
  })
}

module.exports = {
  getBeers,
  getFavoriteBeers,
  setFavorites
}
