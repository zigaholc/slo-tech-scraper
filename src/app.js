const feedDisplay = document.querySelector('#feed')

fetch('http://localhost:8000/results')
  .then((response) => response.json())
  .then((data) => {
    data.forEach((job) => {
      /*-- Shorten the description length --*/
      if (job.description.length > 200)
        job.description = job.description.slice(0, 200) + '...'

      const newJob =
        //prettier-ignore
        `<div class="card">
          <div class="card-content">
            <div class="card-title">
                <h1>` + job.title +`</h1>
                <p>` + job.description +`</p>
            </div>
            <div class="card-body">
                <h2>` + job.company +`</h2>
            </div>
          </div>
        </div>`
      feedDisplay.innerHTML += newJob
    })
  })
  .catch((error) => console.log(error))
