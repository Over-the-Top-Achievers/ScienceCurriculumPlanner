const app = require("../mongoCaller.js");
const mongoose = require("mongoose");
const supertest = require("supertest");

//IDK
beforeEach((done) => {
    mongoose.connect("mongodb+srv://Dennisdb:11220011@cluster0.yp25l.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
      { useNewUrlParser: true, useUnifiedTopology: true },
      () => done());
  });

  afterEach((done) => {
      mongoose.connection.close(() => done())
  });


  describe('Get Endpoints',()=>{
    it("returns status code 200 for /courses", async () => {
      const res =await supertest(app)
        .get("/courses")
      expect(res.statusCode).toEqual(200)//NOTE always first on first run, will pass on second run
    })
    //check for json body
  })

  describe('Post Endpoints',()=>{
    it("should create a new post", async () => {
      const res =await supertest(app)
        .post("/courses")
        .send({
          courseCode:'test'
        })
      expect(res.statusCode).toEqual(201)//for successful create
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