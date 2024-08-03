require('dotenv').config()
const shoesRouter = require('./src/api/routes/shoe')
const { connectDB } = require('./src/config/db')

const express = require('express')
const cors = require('cors')

const app = express()

connectDB()

app.use(cors())

app.use(express.json())

app.use('/api/v1/shoes', shoesRouter)

app.use('*', (req, res, next) => {
  return res.status(404).json('Route not found')
})

app.listen(3000, () => {
  console.log('http://localhost:3000')
})
