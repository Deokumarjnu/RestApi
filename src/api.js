function getBeers(page, per_page) {
  return fetch(`http://localhost:3002/api/beers?page=${page}&per_page=${per_page}`, {
    method: "GET",
    mode: "no-cors",
  })
  .then(res => res.json())
  .catch(error => console.error('Error:', error));
}

function setFavorite(id) {
  return fetch(`http://localhost:3002/api/beers/${id}/favorites`, {
    method: "POST",
    mode: "no-cors",
  })
  .then(res => res.json())
  .catch(error => console.error('Error:', error));
}

module.exports = {
  getBeers,
  setFavorite
}
