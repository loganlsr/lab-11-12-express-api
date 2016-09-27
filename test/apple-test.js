'use strict';

const expect = require('chai').expect;
const request = require('superagent');
const Apple = require('../model/apple.js');
const url = 'http://localhost:3000';

require('../server.js');

const exampleApple = {
  type: 'example',
  color: 'colorexample',
  size: 'examplesize'
};

describe('testing the /api/apple route', function(){
  describe('testing GET requests to /api/apple', function(){
    describe('with a valid id', function(){
      before(done => {
        Apple.createApple(exampleApple)
        .then(apple => {
          this.tempApple = apple;
          done();
        })
        .catch(err => done(err));
      });
      after(done => {
        Apple.deleteApple(this.tempApple.id)
        .then(() => done())
        .catch(err => done(err));
      });
      it('should return an apple', done => {
        request.get(`${url}/api/apple/${this.tempApple.id}`)
        .end((err, res) => {
          if(err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.id).to.equal(this.tempApple.id);
          expect(res.body.type).to.equal(this.tempApple.type);
          expect(res.body.color).to.equal(this.tempApple.color);
          expect(res.body.size).to.equal(this.tempApple.size);
          done();
        });
      });
    });
    describe('with an invalid id', function(){
      it('should respond with 404', done => {
        request.get(`${url}/api/apple?id=1234`)
        .end((err, res) => {
          if(err) return done(err);
          expect(res.status).to.equal(404);
          done();
        });
      });
    });
    describe('with no id', function(){

    });
  });
  describe('testing POST requests to /api/apple', function(){
    describe('with a valid body', function(){
      after(done => {
        if (this.tempApple){
          Apple.deleteApple(this.tempApple.id)
          .then(() => done())
          .catch(err => done(err));
        }
      });
      it('should return an apple', done => {
        request.post(`${url}/api/apple`)
        .send(exampleApple)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(!!res.body.id).to.equal(true);
          expect(res.body.type).to.equal(exampleApple.type);
          expect(res.body.color).to.equal(exampleApple.color);
          expect(res.body.size).to.equal(exampleApple.size);
          this.tempApple = res.body;
          done();
        });
      });
    });
  });

  describe('testing PUT requests to /api/apple', function(){
    describe('with valid id and body', function(){
      before(done => {
        Apple.createApple(exampleApple)
        .then( apple => {
          this.tempApple = apple;
          done();
        })
        .catch(err => done(err));
      });

      after(done => {
        if(this.tempApple){
          Apple.deleteApple(this.tempApple.id)
          .then( () => done())
          .catch(done);
        }
      });

      it('should return an apple', done => {
        let updateData = {type: 'fuji', color: 'red', size: 'medium'};
        request.put(`${url}/api/apple/${this.tempApple.id}`)
        .send(updateData)
        .end((err, res) => {
          if(err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.id).to.equal(this.tempApple.id);
          for (var key in updateData) {
            expect(res.body[key]).to.equal(updateData[key]);
          }
          done();
        });
      });
    });
  });
});
