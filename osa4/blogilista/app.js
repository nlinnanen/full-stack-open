const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const blogsRouter = require('./controllers/blogs')
const config = require('./utils/config')
// const middleware = require('./utils/middleware')

const app = express()

mongoose.connect(config.MONGODB_URI)

app.use(cors())
app.use(express.json())


app.use('/api/blogs', blogsRouter)


module.exports = { app }