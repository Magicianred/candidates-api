const express = require('express')
const app = express()
const router = express.Router()

const cors = require('cors')
const axios = require('axios')
const bodyParser = require('body-parser')
const moongose = require('mongoose')
require('dotenv').config()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())
app.use(router)

var { PORT, MONGODB } = process.env

if (!MONGODB)
  MONGODB = "mongodb+srv://dodozaum:qhhQ9hCGQlR5DHJE@clusterfreecodecamp.nd3vs.mongodb.net/geekhunter?retryWrites=true"

moongose.connect(MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB conectado...'))
  .catch(err => console.log(err));

const services = require('./services')({ axios })
const repository = require('./repository')({ moongose })
const business = require('./business')({ repository, services })
const controller = require('./controller')({ business })

require('./router')({ router, controller })

app.listen(PORT, () => {
  console.log(`We are Up and Running :D at port ${PORT}`);
})
