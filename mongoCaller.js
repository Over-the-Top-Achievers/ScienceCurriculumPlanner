const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb'); 
const bodyParser= require('body-parser');
const { response } = require('express');
const { Parser } = require('json2csv');
const app = express();
app.use(cors());

// var url = "mongodb://localhost:27017/";
var url = "mongodb+srv://Dennisdb:11220011@cluster0.yp25l.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

MongoClient.connect(url, { useUnifiedTopology: true })
  .then(client => {
    const db = client.db('curriculum_planner')
    const courseCollection = db.collection('course')


    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json())

    app.post('/courses', (request, response) =>{//use this method to insert a course into the database
        
        courseCollection.insertOne(request.body)
        //TODO: unsafe adding without checking
        .then(result=>{
            response.send(result)
        })

    })


    app.get('/coursesData', (request, response) =>{
        courseCollection.find({}).toArray()//searches the database for a course
        .then(result =>{
            response.send(JSON.stringify(result))//For display purposes
           
        })
        .catch(error => console.error(error))

    })
    app.get('/coursesCSV', (request, response) =>{
        courseCollection.find({}).toArray()//searches the database for a course
        .then(result =>{
            var fields = [
//             '_id',
            'Course_Code',
            'Course_Name',
            'Credits',
            'NQF',
            'Slot',
            'Semester',
            'Year',
            'Co_requisite',
            'Pre_requisite'];
            const p = new Parser( {fields } )
            var data = p.parse(result)
//             response.send(data)//For display purposes
            response.send(JSON.stringify(data))//For display purposes
        })


    })
    app.put('/courses', (request, response) => {
        // console.log(request.body);
        courseCollection.findOneAndUpdate(
            {Course_Code:request.body.oldCourseCode},
            {
                $set:{
                    Course_Code:request.body.newCourseCode,//use this to update the info in the database
                    Course_Name:request.body.newCourseName,
                    Credits:request.body.newCred,
                    NQF:request.body.newNQF,
                    Slot:request.body.newSlot,
                    Semester:request.body.newSem,
                    Year:request.body.newYear,
                    Co_requisite:request.body.newCoReq,
                    Pre_requisite:request.body.newPreReq,
                    Shareable:request.body.newShareable
                }
            }
        )
        .then(result=>{
            response.send(result)
        })

    })


    app.delete('/courses', (request, response) => {
        
        courseCollection.deleteOne(
            {Course_Code:request.body.courseCode}//courseCode is a parameter in the query in the javascript file
        )
        .then(result =>{
            console.log(request.body)
            // response.json('Deleted '+request.body.courseCode);
            response.send(result)
        })

    })



  })
  .catch(error => console.error(error))

  

// GET -> Fetch things
// PUT -> Change something on a server (update the course code) 
// POST -> Put something new onto the server (upload an image)
// DELETE -> Delete something from the server (Delete a course)




//For testing / supertests
module.exports = app;
