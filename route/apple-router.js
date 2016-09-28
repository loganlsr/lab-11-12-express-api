'use strict';

const Router = require('express').Router;
const debug = require('debug')('note:note-router');
const jsonParser = require('body-parser').json();

const Apple = require('../model/apple.js');

const appleRouter = new Router();

appleRouter.get('/api/apple/:id', function(req, res, next){
  debug('hit route /api/apple');
  Apple.fetchApple(req.params.id)
  .then( apple => res.json(apple))
  .catch( err => next(err));
});

appleRouter.get('/api/apple/', function(req, res, next) {
  Apple.fetchIDs()
  .then( ids => res.json(ids))
  .catch(next);
});

appleRouter.post('/api/apple/', jsonParser, function(req, res, next){
  debug('hit route POST /api/apple');
  Apple.createApple(req.body)
  .then(apple => res.json(apple))
  .catch(err => next(err));
});

appleRouter.put('/api/apple', jsonParser, function(req, res, next){
  debug('hit route PUT /api/apple');
  Apple.updateApple(req.query.id, req.body)
  .then( apple => res.json(apple))
  .catch(err => next(err));
});

module.exports = appleRouter;
