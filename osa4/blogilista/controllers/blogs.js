const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')


blogsRouter.get('/', async (request, response) => {

  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })

  if(blogs) {
    response.json(blogs)
  } else {
    response.status(404).end()
  }
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const token = request.token

  const decodedToken = jwt.verify(token, process.env.SECRET)

  if(!decodedToken || !decodedToken.id) {
    response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  const result = await blog.save()

  user.blogs = user.blogs.concat(result._id)
  await user.save()

  response.json(result)
})

blogsRouter.delete('/:id', async (request, response) => {
  const idToDelete = request.params.id
  const token = request.token
  const user = request.user

  const blog = await Blog.findById(idToDelete)

  console.log(user)
  if (user && blog && user._id.toString() === blog.user.toString()){
    await Blog.findByIdAndRemove(idToDelete)
    response.status(204).end()
  } else if(!user) {
    response.status(401).json({ error: 'Invalid token'})
  } else if(!blog) {
    response.status(404).json({ error: 'Invalid id'})
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const newBlog = request.body

  const updatedBlog = await Blog
    .findByIdAndUpdate(request.params.id, newBlog, { new: true })

  response.json(updatedBlog)
})

module.exports = blogsRouter
