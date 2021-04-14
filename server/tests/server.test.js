const app = require("../mongoCaller.js");
const mongoose = require("mongoose");
const supertest = require("supertest");
const { response } = require("../mongoCaller.js");
const { expect } = require("chai");
//IDK
beforeEach((done) => {
    mongoose.connect("mongodb+srv://Dennisdb:11220011@cluster0.yp25l.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
      { useNewUrlParser: true, useUnifiedTopology: true },
      () => done());
  });

  afterEach((done) => {
      mongoose.connection.close(() => done())
  });

  test("GET localhost:8080/courses", async () => {
  
    await supertest(app).get("/courses")
      .expect(200)
      .then((response)=>{
        return true
      })
  });

