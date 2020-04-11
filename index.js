const mongo = require('mongoose')
const config = require('./utils/config')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const loginRouter = require('./controllers/router.js')
const morgan = require('morgan')

const app = express()
mongo.connect(config.mongo_url,  { useNewUrlParser: true  ,useUnifiedTopology: true})

app.use(morgan('tiny'))
app.use(cors())
app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(loginRouter)

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`)
})
