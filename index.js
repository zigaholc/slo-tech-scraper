const PORT = 8000
const axios = require('axios')
const cheerio = require('cheerio')
const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())

const url = 'https://slo-tech.com/delo'

const getJobAdverts = async () => {
  try {
    const { data } = await axios.get(url)
    const $ = cheerio.load(data)
    const jobs = []

    $('.forums tbody tr', data).each((index, job) => {
      const title = $(job).find('.name h3').text()
      const company = $(job).find('.company').text()
      const description = $(job).find('.name div').text()
      const attr = $(job).find('.name h3 a').attr()
      const povezava = url + attr.href.slice(5)

      jobs.push({ title, company, description })
    })
    return jobs
  } catch (error) {
    throw error
  }
}

app.get('/', function (req, res) {
  res.json(`slo-tech job scraper`)
})

app.get('/results', (req, res) => {
  getJobAdverts().then((jobs) => res.json(jobs))
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
