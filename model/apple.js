'use strict';

const createError = require('http-errors');
const debug = require('debug')('note:server');
const uuid = require('node-uuid');
const storage = require('../lib/storage.js');


const Apple = module.exports = function(type, color, size){
  debug('instantiate apple');
  if (!type) throw createError(400, 'expected type');
  if (!color) throw createError(400, 'exptected color');
  if (!size) throw createError(400, 'exptected size');

  this.id = uuid.v1();
  this.type = type;
  this.color = color;
  this.size = size;
};

Apple.createApple = function(){
  debug('createApple');
  try{
    let apple = new Apple(apple.color, apple.color);
    return storage.createItem('apple', apple);
  } catch (err) {
    return Promise.reject(err);
  }
};

Apple.fetchApple = function(id){
  debug('fetchApple');
  return storage.fetchItem('apple', id);
};

Apple.updateApple = function(id, _apple){
  debug('fetchApple');
  return storage.fetchItem('apple', id)
  .catch( err => Promise.reject(createError(404, err.message)))
  .then( apple => {
    for (var key in apple){
      if (key === 'id') continue;
      if (_apple[key]) apple[key] = _apple[key];
    }
    return storage.createItem('apple', apple);
  });
};

Apple.deleteApple = function(id){
  debug('deleteApple');
  return storage.deleteItem('apple', id);
};

Apple.fetchIDs = function(){
  debug('fetchIDs');
  return storage.availIDs('apple');
};
