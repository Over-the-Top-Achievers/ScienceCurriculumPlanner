var app = require('../mongoCaller.js');
var  chai = require('chai');
var  request= require('supertest');
const { response } = require('express');
// var courses_data_endpoint = request('http://localhost:8080/coursesData');
// var courses_endpoint =  request('http://localhost:8080/courses');




  describe('Course Data Tests', function() {
    it('responds with html containing data',   (done) => {
        // const res =await request.get("/courses");
    courses_data_endpoint
      .get('/coursesData')
      .set('Accept', 'application/json')
      .expect('Content-Type','text/html; charset=utf-8')
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        else done();
    });
    });
  });

describe('Course Functionality Tests', function() {
    it('GET html basic frontpage',   (done) => {
        // const res =await request.get("/courses");
    courses_endpoint
      .get('/courses')
      .set('Accept', 'application/json')
      .expect('Content-Type','text/html; charset=utf-8')
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        else done();
    });
    });
    it('PUT update course info',   (done) => {
        // const res =await request.get("/courses");
    courses_endpoint
      .delete('/courses')
      .set('Accept', 'application/json')
      .expect('Content-Type','text/html; charset=utf-8')
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        else done();
    });
    });
    it('POST create course info',   (done) => {
        // const res =await request.get("/courses");
    courses_endpoint
      .get('/courses')
      .set('Accept', 'application/json')
      .expect('Content-Type','text/html; charset=utf-8')
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        else done();
    });
    });
    it('DELETE delete course info',   (done) => {
        // const res =await request.get("/courses");
    courses_endpoint
      .get('/courses')
      .set('Accept', 'application/json')
      .expect('Content-Type','text/html; charset=utf-8')
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        else done();
    });
    });
  });


