const request = require('request-promise-native');

const getBeers = (page = 1, per_page = 9) => {
  var options = {
      uri: `https://api.punkapi.com/v2/beers`,
      qs: {
          page,
          per_page
      },
      json: true // Automatically parses the JSON string in the response
  };

  return request(options)
          .then((result)=>{
            return {
              'result' : result
            };
          })
          .catch(err => {
            console.log(err);
            return {
              'error' : 'Unable to fetch data'
            };
        });
}

module.exports = {
  getBeers
}
