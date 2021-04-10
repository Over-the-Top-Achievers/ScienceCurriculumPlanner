const update = document.querySelector('#update-button')
const delete_course = document.querySelector('#delete-button')
const messageDiv = document.querySelector('#message')
const get = document.querySelector('#searchBtn')
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
  console.log('yes no request');
  console.log(course_data);
  console.log(document.getElementById("courses"));
  return false;
})

update.addEventListener('click', _ => {
    // Send PUT Request here
    fetch('/courses', {
        method:'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            courseCode: 'COMS5000',
            nqf: 15
          })
    })
  })

  delete_course.addEventListener('click', _ => {
    fetch('/courses', {
        method:'delete',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            courseCode: 'COMS5000',
          })
    })
      .then(response => {
        if(response==='No course to delete'){
          messageDiv.textContent='No course to delete' 
        }

      })
      .then(data=>{
        window.location.reload()
      })
  })