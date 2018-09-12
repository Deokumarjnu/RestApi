var express = require('express');
var app = express();
var url = require('url');
const uuidv4 = require('uuid/v4');
var cookieParser = require('cookie-parser')
const domainLayerFun = require('./domain-layer');

app.set('view engine', 'ejs');
app.set('views','./server/views');

app.use(cookieParser());

app.use((req, res, next) => {
  if (!req.cookies.user) {
    res.cookie('user', uuidv4(),{maxAge: 3600000});
    users[req.cookies.user]=new Set([]);
  }
  next();
});

// home page and pagingation api
app.get('/api/beers', (req, res, next) => {
  var url_parts = url.parse(req.url, true);
  var query = url_parts.query;

  const page = req.query.page;
  const per_page = req.query.per_page;

  domainLayerFun.getBeers(page, per_page, req.cookies.user).then(({result,error}) => {
    if (error) {
      console.log(error);
      res.status(500).send();
    }
    else {
      console.log(result);
      res.header("Content-Type", "application/json");
      res.status(200).send(result);
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).send();
  });
});

app.post('/api/beers/:id/favorites', (req, res, next) => {
  const id = req.params.id;
  const favoritesItems = domainLayerFun.favorites(id, req.cookies.user);
  const url_parts = url.parse(req.url, true);
  const query = url_parts.query;

  const page = req.query.page;
  const per_page = req.query.per_page;

  domainLayerFun.getBeers(page, per_page, req.cookies.user).then(({result,error}) => {
    if (error) {
      console.log(error);
      res.status(500).send();
    }
    else {
      console.log(result);
      res.header("Content-Type", "application/json");
      res.status(200).send(result);
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).send();
  });
});

app.get('/', (req, res) => {
  res.status(200).render('./layout.ejs', {
    title: 'Home',
    page_type: 'home'
  });
});

app.get('/favorites', (req, res) => {
  res.status(200).render('./layout.ejs', {
    title: 'Favorites',
    page_type: 'favorites'
  });
});

app.listen('3002',()=> {
  console.log("node server listening on 3002");
})
