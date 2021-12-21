const blogsRouter = require('express').Router()
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

  if(!body.userId){
    throw {
      name: 'ValidationError',
      message: 'userId must be defined'
    }
  }

  const user = await User.findById(body.userId)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  const result = await blog.save()

  console.log(user)
  user.blogs = user.blogs.concat(result._id)
  await user.save()

  response.json(result)
})

blogsRouter.delete('/:id', async (request, response) => {
  const idToDelete = request.params.id
  console.log(idToDelete)
  await Blog.findByIdAndRemove(idToDelete)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const newBlog = request.body

  const updatedBlog = await Blog
    .findByIdAndUpdate(request.params.id, newBlog, { new: true })

  response.json(updatedBlog)
})

module.exports = blogsRouter
