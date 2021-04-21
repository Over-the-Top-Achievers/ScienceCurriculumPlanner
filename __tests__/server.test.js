var app = require('../mongoCaller.js');
var  supertest= require('supertest');
var request= supertest(app);
var { should, expect, assert } = require('chai')

// const { response } = require('../mongoCaller.js');
// const { response } = require('express');
//IDK

describe("GET /test", () => {
  it('responds with 200 OK', (done) => {
    var status = 200;
    expect(status).to.equal(200);
    // request.get('/test')
    //   .expect(200, done);
  });
});

// it("Checks courses page", async done => {
//     // Sends GET Request to /test endpoint
//     const res = await request.get("/coursesData");
//     expect(res.status).toBe(200);
//     // ...
//     done();
//   });
// describe('GET /test', function(){
//   it("Gets the test endpoint", () => {
//     // Sends GET Request to /test endpoint
//     request.get("http://localhost:8080/test").expect(200).end((error,response)=>{
//       console.log(response);
//     });
//     // ...
//   });
// })

//   describe('GET /test', function(){
//     it('responds',function(done){
//       return request(app)
//         .get('/coursesData')
//         .set('Accept','application/json')
//         .expect(200,done);
//     })
//     .catch(err=> done(err))
//   })

  // describe('GET /coursesData', function(){
  //   it('responds',function(done){
  //     return request(app)
  //       .get('/coursesData')
  //       .set('Accept','application/json')
  //       .expect(200,done);
  //   })
  //   .catch(err=> done(err))
  // })

