const express = require('express')
const { MongoClient } = require('mongodb'); 
const bodyParser= require('body-parser');
const { response } = require('express');
const app = express()

var url = "mongodb://localhost:27017/";

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

    app.put('/courses', (request, response) => {
        courseCollection.findOneAndUpdate(
            {courseCode:'COMS3000'},
            {
                $set:{
                    courseCode:request.body.courseCode,//use this to update the info in the database
                    nqf:request.body.nqf
                }
            },
            {
                upsert:true//use this if we want to add a new entry if none of the queried entries exist
            }
        )
        .then(result =>{
            console.log(result)
        })
        .catch(error => console.error(error))
    })

    app.delete('/courses', (request, response) => {
        courseCollection.deleteOne(
            {courseCode:request.body.courseCode}//courseCode is a parameter in the query in the javascript file
        )
        .then(result =>{
            if(result.deletedCount===0){
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



// function modifyCourse()

// app.get('/courses/:code', (request, response) => {
//     response.end(courseCode(request))
// })

// app.use(bodyParser.urlencoded({ extended: true }))

// app.post('/courses', (request, response) =>{
//     console.log(request.body)
// })

// app.put('/courses/:code', (request, response) =>{
//     response.send(courseCode(request))//fix this
// })

// app.delete('/courses/:code', (request, response) => {
//     response.send(courseCode(request))
//   })
function searchCourse(request) {//look the database and return some courses
    return JSON.stringify(request.params.code)
}

function updateCourse(){

}

function deleteCourse(){

}

function editCourse(){

}
app.get('/', (req, res) => {
res.sendFile(__dirname + '/views/index.ejs')
})


var server = app.listen(8080, () => {
    var host = server.address().address;
    var port = server.address().port;

    console.log(`Listening at http://${host}:${port}`);
})