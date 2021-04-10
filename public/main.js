
const update = document.querySelector('#update-button')
const delete_course = document.querySelector('#delete-button')
const messageDiv = document.querySelector('#message')
const get = document.querySelector('#searchBtn')

get.addEventListener('click', _ => {
  // Send PUT Request here
  fetch('/courses', {
      method:'GET',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
          courseCode: 'COMS5000'
        })
  })


  .then(response => {
    console.log("jejejejajjjajsj")
    if(response==='found'){
      
      messageDiv.textContent='Found a course' 
    }

  })

  .then(data=>{
    window.location.reload()
  })
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