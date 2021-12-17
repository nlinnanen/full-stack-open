const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const blogsRouter = require('./controllers/blogs')
const config = require('./utils/config')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')

const app = express()

logger.info('connecting to', config.MONGODB_URI)
mongoose.connect(config.MONGODB_URI)

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/blogs', blogsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app