const should = require('should');
const supertest = require('supertest');

const server = supertest.agent('http://localhost:9000');

describe('GET /data', function() {
  it('should count all db entries', function(done) {
    server
      .get('/data')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        if (err) done(err);
        res.status.should.equal(200);
        res.body.should.have.property('data');
        done();
      });
  });

  it('should return 404', function(done) {
    server
      .get('/random')
      .expect(404)
      .end(function(err,res) {
        res.status.should.equal(404);
        done();
      });
  });
});


describe('POST /data', function() {
  it('should add a new db entry', function(done) {
    server
      .post('/data')
      .send({'userId':'123123123'})
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) done(err);
        res.body.should.have.property('index');
        done();
      });
  });

  it('should return 404', function(done) {
    server
      .post('/random')
      .send({'userId':'123123123'})
      .expect(404)
      .end(function(err,res) {
        res.status.should.equal(404);
        done();
      });
  });
});
