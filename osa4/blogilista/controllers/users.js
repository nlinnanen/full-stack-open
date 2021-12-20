const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')

const Blog = require('../models/blog')
const User = require('../models/user')


usersRouter.get('/', async (request, response) => {
  const users = await User.find({})

  if(users) {
    response.json(users)
  } else {
    response.status(404).end()
  }
})

usersRouter.post('/', async (request, response) => {
  const body = request.body

  if(body.password.length < 3)  {
    throw {
      name: 'ValidationError',
      message: 'Password must be atleast 3 characters long'
    }
  }

  const passwordHash = await bcrypt.hash(body.password, 10)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash
  })

  const result = await user.save()
  
  response.json(result)
})

module.exports = usersRouter
