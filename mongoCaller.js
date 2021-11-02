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
    const highschoolApsCollection = db.collection('high_school_subjects_and_aps')
    const degreeRequirement = db.collection('degree_requirement')

    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json())

    app.post('/courses', (request, response) =>{//use this method to insert a course into the database
        
        courseCollection.insertOne(request.body)
        //TODO: unsafe adding without checking
        .then(result=>{
            response.send(result)
        })

    })
    app.post('/updateReq', (request, response) =>{//use this method to insert a course into the database
        
        degreeRequirement.insertOne(request.body)
        //TODO: unsafe adding without checking
        .then(result=>{
            response.send(result)
        })

    })
    app.post('/updateAPS', (request, response) =>{//use this method to insert a course into the database
        
        highschoolApsCollection.insertOne(request.body)
        //TODO: unsafe adding without checking
        .then(result=>{
            response.send(result)
        })

    })

    app.put('/addDegree', (request, response) => {
        degreeRequirement.insertOne(
            request.body
        )
        .then(result=>{
            response.send(result)
        })

    })

    app.delete('/degrees', (request, response) => {
        
        degreeRequirement.deleteOne({
            Degree_Name:request.body.Degree_Name
        })
        .then(result =>{
            response.send(result)
        })

    })

    app.get('/degreeReq', (request, response) =>{
        degreeRequirement.find({}).toArray()//searches the database for a course
        .then(result =>{
            response.send(JSON.stringify(result))//For display purposes
           
        })
        //.catch(error => console.error(error))
    })

    app.get('/subjectsData', (request, response) =>{
        
        highschoolApsCollection.find({}).toArray()
        .then(results => {

            // First sort alphabetically
            var alphabeticalResults = results.sort(function(left, right) {
                return left.Subject < right.Subject ? -1 : left.Subject > right.Subject ? 1 : 0
            });

            // Sort a copy by priority and get the top 6
            var finalResults = [...alphabeticalResults].sort(function(left, right) {

                var leftP = left.hasOwnProperty("Priority") ? left.Priority : 0;
                var rightP = right.hasOwnProperty("Priority") ? right.Priority : 0;

                return leftP > rightP ? -1 : leftP < rightP ? 1 : 0

            }).slice(0, 6);

            // Add a separator
            finalResults.push({
                Subject: '---------------------'
            });

            // Add the alphabetical results to the final results
            finalResults = finalResults.concat(alphabeticalResults);

            // Return the sorted result set
            response.send( JSON.stringify( finalResults ) )
           
        })
        //.catch(error => console.error(error))
    })

    app.put('/incrementSubjectPriority', (req, res) => {

        highschoolApsCollection.findOneAndUpdate(
            {
                Subject: req.body.Subject
            },
            {
                // $set: 
                // {
                //     Priority: 0
                // }
                $inc:
                {
                    Priority: 1
                }
            }
        )
        .then( result => {
            res.send(result)
        })

    })

    app.get('/coursesData', (request, response) =>{
        courseCollection.find({}).toArray()//searches the database for a course
        .then(result =>{
            response.send(JSON.stringify(result))//For display purposes
           
        })
        //.catch(error => console.error(error))
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


    app.put('/updateAPS', (request, response) => {
        // console.log(request.body);
        highschoolApsCollection.findOneAndUpdate(
            {Subject:request.body.oldSubject},
            {
                $set:{
                    Subject:request.body.oldSubject,//use this to update the info in the database
                    Level_100_90:request.body.newLevel_100_90,
                    Level_89_80:request.body.newLevel_89_80,
                    Level_79_70:request.body.newLevel_79_70,
                    Level_69_60:request.body.newLevel_69_60,
                    Level_59_50:request.body.newLevel_59_50,
                    Level_49_40:request.body.newLevel_49_40,
                    Level_39_30:request.body.newLevel_39_30,
                    Level_29_0:request.body.newLevel_29_0
                }
            }
        )
        .then(result=>{
            response.send(result)
        })

    })

    app.put('/updateReq', (request, response) => {
        degreeRequirement.findOneAndUpdate(
            {Degree_Name:request.body.newDegree_Name},
            {
                $set:{
                    Degree_Name:request.body.newDegree_Name,
                    Firm_Offer:request.body.newFirm_Offer,
                    Waitlist:request.body.newWaitlist,
                    Reject:request.body.newReject
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
            // response.json('Deleted '+request.body.courseCode);
            response.send(result)
        })

    })

    app.delete('/updateReq', (request, response) => {
        
        degreeRequirement.deleteOne(
            {Degree_Name:request.body.Degree_Name}
        )
        .then(result =>{
            response.send(result)
        })

    })

    app.delete('/updateAPS', (request, response) => {
        
        highschoolApsCollection.deleteOne(
            {Subject:request.body.Subject}
        )
        .then(result =>{
            response.send(result)
        })

    })



  })
  //.catch(error => console.error(error))

  

// GET -> Fetch things
// PUT -> Change something on a server (update the course code) 
// POST -> Put something new onto the server (upload an image)
// DELETE -> Delete something from the server (Delete a course)



//For testing / supertests
module.exports = app;
