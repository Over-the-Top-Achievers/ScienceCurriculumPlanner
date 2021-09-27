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
  describe('Get degreeReq Endpoint',()=>{
    it("returns status code 200 for /degreeReq", async () => {
      const res =await supertest(app)
        .get("/degreeReq")
      expect(res.statusCode).toEqual(200)
    })
    //check for json body
  })
  describe('Get subjectsData Endpoint',()=>{
    it("returns status code 200 for /subjectsData", async () => {
      const res =await supertest(app)
        .get("/subjectsData")
      expect(res.statusCode).toEqual(200)
    })
    //check for json body
  })

  describe('Put Endpoints',()=>{

    it("should create a new put on courses endpoint", async () => {
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

    it("should create a new put on updateAPS endpoint", async () => {
      const res =await supertest(app)
        .put("/updateAPS")
        .send({
          oldSubject: 'testSubject',
          newLevel_100_90: 'test',
        })
        
      expect(res.statusCode).toEqual(200)
      //check that we actually editted it
       
    });

    it("should create a new put on updateReq endpoint", async () => {
      const res =await supertest(app)
        .put("/updateReq")
        .send({
          newDegree_Name: 'testDegree_Name',
          newFirm_Offer: 'testFirm_Offer'
        })
        
      expect(res.statusCode).toEqual(200)
      //check that we actually editted it
       
    });

    it("should create a new put on addDegree endpoint", async () => {
      const res =await supertest(app)
        .put("/addDegree")
        .send({
          Degree_Name: 'testDegree_Name',
          Firm_Offer: 'testFirm_Offer'
        })
        
      expect(res.statusCode).toEqual(200)
      //check that we actually editted it
       
    });

  })
  describe('Post Endpoints',()=>{
    it("should create a new post on courses endpoint", async () => {
      const res =await supertest(app)
        .post("/courses")
        .send({
          Course_Code:'test'
        })
      expect(res.statusCode).toEqual(200)//for successful create
    });

    it("should create a new post on updateAPS endpoint", async () => {
      const res =await supertest(app)
        .post("/updateAPS")
        .send({
          Subject:'testSubject'
        })
      expect(res.statusCode).toEqual(200)//for successful create
    });

    it("should create a new post on updateReq endpoint", async () => {
      const res =await supertest(app)
        .post("/updateReq")
        .send({
          Degree_Name:'testDegree_Name'
        })
      expect(res.statusCode).toEqual(200)//for successful create
    });
    

  })

  


  describe('Delete Endpoints',()=>{
    it("should delete on courses endpoint", async () => {
      const res =await supertest(app)
        .delete("/courses")
        .send({
          courseCode:'test'
        })
      expect(res.statusCode).toEqual(200)
    });

    it("should delete on updateReq endpoint", async () => {
      const res =await supertest(app)
        .delete("/updateReq")
        .send({
          Degree_Name:'testDegree_Name'
        })
      expect(res.statusCode).toEqual(200)
    });

    it("should delete on updateAPS endpoint", async () => {
      const res =await supertest(app)
        .delete("/updateAPS")
        .send({
          Subject:'testSubject'
        })
      expect(res.statusCode).toEqual(200)
    });
  })