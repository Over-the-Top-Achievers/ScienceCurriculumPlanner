const express = require('express')
const { MongoClient } = require('mongodb'); 
const bodyParser= require('body-parser');
const { response, json } = require('express');
const app = express()

// var url = "mongodb://localhost:27017/";
var url = "mongodb+srv://Dennisdb:11220011@cluster0.yp25l.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

MongoClient.connect(url, { useUnifiedTopology: true })
  .then(client => {
    const db = client.db('curriculum_planner')
    const courseCollection = db.collection('course')
    app.set('view engine', 'ejs')//we use this to be able to write javascript that can change the webpage since html is static and cannot be changed
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json())
    app.use(express.static('public'))

    app.post('/courses', (request, response) =>{//use this method to insert a course into the database
        courseCollection.insertOne(request.body)
        //TODO: unsafe adding without checking
        .then(result =>{
            response.redirect('/courses')//use this to send us back to a page, in this case everything is displayed on a /courses page for now
        })
        .catch(error => console.error(error))
    })

    app.get('/courses', (request, response) =>{

        courseCollection.find(request.body).toArray()//searches the database for a course
        .then(result =>{
            
            response.render('index.ejs',{courses:result})//For display purposes
           
        })
        .catch(error => console.error(error))

    })
    app.get('/coursesData', (request, response) =>{
        courseCollection.find({}).toArray()//searches the database for a course
        .then(result =>{
            response.set('Content-type','application/json')
            response.send(JSON.stringify(result))//For display purposes
           
        })
        .catch(error => console.error(error))

    })


    app.put('/courses', (request, response) => {
        courseCollection.findOneAndUpdate(
            {courseCode:request.body.oldCourseCode},
            {
                $set:{
                    courseCode:request.body.newCourseCode,//use this to update the info in the database
                    nqf:request.body.newNQF
                }
            }
            //TODO:error message if not in database
            // {
            //     upsert:true//use this if we want to add a new entry if none of the queried entries exist
            // }
        )
        .then(result=>{
            response.send(result)
        })
        .catch(error => console.error(error))
    })

    app.delete('/courses', (request, response) => {
        courseCollection.deleteOne(
            {courseCode:request.body.courseCode}//courseCode is a parameter in the query in the javascript file
        )
        .then(result =>{
            if(result.deletedCount===0){//TODO: doesnt work
                return response.json('No course to delete')//Can use error codes here instead
            }
            response.json('Deleted COMS5000')
        })
        .catch(error => console.error(error))
    })



  })
  .catch(error => console.error(error))

  

// GET -> Fetch things
// PUT -> Change something on a server (update the course code) 
// POST -> Put something new onto the server (upload an image)
// DELETE -> Delete something from the server (Delete a course)

app.get('/', (req, res) => {
res.sendFile(__dirname + '/views/index.ejs')
})


// var server = app.listen(8080, () => {
//     var host = server.address().address;
//     var port = server.address().port;

//     console.log(`Listening at http://${host}:${port}`);
// })
//For testing / supertests
module.exports = app;