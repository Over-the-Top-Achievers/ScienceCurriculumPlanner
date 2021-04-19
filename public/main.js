const update = document.querySelector('#updateButton')
const delete_course = document.querySelector('#delete-button')
const messageDiv = document.querySelector('#message')
const get = document.querySelector('#searchBtn')
const search_box= document.querySelector('#searchTextBox')
const delete_box= document.querySelector('#deleteTextBox')
const update_old_code = document.querySelector('#updateOldCode')
const update_new_code = document.querySelector('#updateNewCode')
const update_new_nqf = document.querySelector('#updateNewNQF')
const insert_code = document.querySelector('#insertCode')
const insert_nqf = document.querySelector('#insertNQF')
const insert = document.querySelector('#insertButton')
var course_data;


//Initial fetch of couse info as json data 
fetch('/coursesData', { method: 'GET'})
  .then((res) => {
     return res.json()
})
  .then((json) => {
   // Do something with the returned data.
  course_data=json;
  //Example access

  console.log('there are '+course_data.length+' courses');
  //console.log(json[0].courseCode);

});

// removed showing the pre and co of a course due to change to database 


get.addEventListener('click', _ => {
 //Get code
  var search_code= search_box.value;
  for (let index = 0; index < course_data.length; index++) {
    const element = course_data[index];
    //TODO :test the type of this
    //Adds div of json data of searched code
    if(element.courseCode==search_code){//NOTE: maybe ===
      var para = document.createElement("result");                       // Create a <p> node
      var t = document.createTextNode(JSON.stringify(element));
      para.appendChild(t);                                          // Append the text to <p>
      document.getElementById("searchResult").appendChild(para); 
    }
  }
  return false;
})
insert.addEventListener('click', _=>{
  //preventing from entering the same course code twice 
  for(var i = 0;i < course_data.length;i++){
    if(course_data[i].courseCode == insert_code.value.toString().toUpperCase()){
      console.log('cannot enter the same course twice!');
      return;
    }
  }

  // preventing from entering empty value.
  if(insert_code.value == '' || insert_nqf.value == ''){
    console.log('this is empty, please enter value.');
    return
  }

  // if information is filled, pass to database.
  else{
    fetch('/courses', {
      method:'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        // upper case for change the course code to uppercase in the database
          courseCode: insert_code.value.toString().toUpperCase(),
          nqf:insert_nqf.value.toString().toUpperCase()
        })
  }).then(data=>{//Reloads page fully to reflect change
    window.location.href=window.location.href
  })
  }

}) 
update.addEventListener('click', _ => {
    // Send PUT Request here
    //NOTE: not checking maybe check on clientside first
    fetch('/courses', {
        method:'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            oldCourseCode: update_old_code.value,
            newCourseCode: update_new_code.value,
            newNQF: update_new_nqf.value 
          })
    })
    
  })

  delete_course.addEventListener('click', _ => {
    fetch('/courses', {
        method:'delete',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            courseCode: delete_box.value,
          })
    })
      .then(response => {//TODO: doesnt work
        if(response==='No course to delete'){
          messageDiv.textContent='No course to delete' 
        }

      })
      .then(data=>{
        window.location.reload()
      })
  })