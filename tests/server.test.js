const app = require("../mongoCaller.js");
const mongoose = require("mongoose");
const supertest = require("supertest");
const { expect } = require("chai");

beforeEach((done) => {
    mongoose.connect("mongodb+srv://Dennisdb:11220011@cluster0.yp25l.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
      { useNewUrlParser: true, useUnifiedTopology: true },
      () => done());
  });

  afterEach((done) => {
      mongoose.connection.close(() => done())
  });


  describe('Get Data Endpoint',()=>{
    it("returns status code 200 for /coursesData", async () => {
      const res =await supertest(app)
        .get("/coursesData")
      expect(res.statusCode).toEqual(200)
    })
    //check for json body
  })
  describe('Get CSV Endpoint',()=>{
    it("returns status code 200 for /coursesCSV", async () => {
      const res =await supertest(app)
        .get("/coursesCSV")
      expect(res.statusCode).toEqual(200)
    })
    //check for json body
  })


  describe('Post Endpoints',()=>{
    it("should create a new post", async () => {
      const res =await supertest(app)
        .post("/courses")
        .send({
          Course_Code:'test'
        })
      expect(res.statusCode).toEqual(200)//for successful create
    })

  })

  describe('Put Endpoints',()=>{

    it("should create a new put", async () => {
      const res =await supertest(app)
        .put("/courses")
        .send({
          oldCourseCode: 'test',
          newCourseCode: 'test',
          newNQF: 50
        })
        
      expect(res.statusCode).toEqual(200)
      //check that we actually editted it
       
    });

  })


  describe('Delete Endpoints',()=>{
    it("DELETE localhost:8080/courses", async () => {
      const res =await supertest(app)
        .delete("/courses")
        .send({
          courseCode:'test'
        })
      expect(res.statusCode).toEqual(200)
    })
  })