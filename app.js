const express = require('express')
const connectDb = require('./database/connection')
const app = express()

require('dotenv').config()
require('express-async-errors')
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/v1/products', require('./routes/products'))
app.use('*', require('./middlewares/notFound'))
app.use(require('./middlewares/errorHandler'))

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server is listenning on port ${PORT}.`)

  connectDb()
})
