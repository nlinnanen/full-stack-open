const blogsRouter = require('express').Router()
const Blog = require('../models/blog')


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})

  if(blogs) {
    response.json(blogs)
  } else {
    response.status(404).end()
  }
  const savedBlog = await blog.save()
  response.json(savedBlog)

})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)

  const result = await blog.save()
  
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
