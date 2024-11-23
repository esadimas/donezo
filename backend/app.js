require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 3000

const connectDB = require('./config/mongodb')

// connect to mongodb
connectDB()

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})