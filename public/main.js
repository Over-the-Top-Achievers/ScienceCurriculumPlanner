const update = document.querySelector('#updateButton')
const delete_course = document.querySelector('#delete-button')
const messageDiv = document.querySelector('#message')
const get = document.querySelector('#searchBtn')
const search_box= document.querySelector('#searchTextBox')
const delete_box= document.querySelector('#deleteTextBox')
const update_old_code = document.querySelector('#updateOldCode')
const update_new_code = document.querySelector('#updateNewCode')
const update_new_nqf = document.querySelector('#updateNewNQF')
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
  console.log(json[0].courseCode);
});
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