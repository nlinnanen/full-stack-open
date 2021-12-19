const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')

const initialBlogs = [
  {
    "title": "Another fun blog",
    "author": "Tiina Teekkari",
    "url": "www.tiina.com",
    "likes": 4
  },
  {
    "title": "Fun blog",
    "author": "Teemu Teekkari",
    "url": "www.teemu.com",
    "likes": 123
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})


test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('get returns correct amount of blogs', async () => {
  const response = await api.get('/api/blogs')
  
  expect(response.body).toHaveLength(initialBlogs.length)
})

test('get has field "id"', async () => {
  const response = await api.get('/api/blogs')
  
  response.body.forEach(element => {
    expect(element.id).toBeDefined()
  })
})

test('post writes correct data to database', async () => {

  const newBlog = {
    title: "Another fun blog",
    author: "Tiina Teekkari",
    url: "www.tiina.com",
    likes: 4
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const titles = response.body.map(r => r.title)

  expect(response.body).toHaveLength(initialBlogs.length + 1)
  expect(titles).toContain(newBlog.title)


}) 

test('default value to likes is 0', async () => {

  const newBlog = {
    title: "Another fun blog",
    author: "Tiina Teekkari",
    url: "www.tiina.com",
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const likes = response.body.map(r => r.likes)

  expect(response.body).toHaveLength(initialBlogs.length + 1)
  expect(likes).toContain(0)

})

test('if title is undefined status is 400', async () => {

  const newBlog = {
    author: "Tiina Teekkari",
    url: "www.tiina.com"
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
    
}) 

test('if url is undefined status is 400', async () => {

  const newBlog = {
    title: "even more fun blogs",
    author: "Tiina Teekkari"
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

})

test('deleting a blog works', async () => {
  const blogsInTheStart = await api.get(`/api/blogs`)
  const idToDelte = blogsInTheStart.body[0].id

  await api
    .delete(`/api/blogs/${idToDelte}`)
    .expect(204)

  const blogsInTheEnd = await api.get(`/api/blogs`)

  expect(blogsInTheEnd.body).toHaveLength(blogsInTheStart.body.length - 1)

  const idsInResult = blogsInTheEnd.body.map(blog => blog.id)
  expect(idsInResult).not.toContain(idToDelte)
  
})

test('updating a blog works', async () => {
  const blogsInTheStart = await api.get('/api/blogs')
  const updatedBlog = {
    ...blogsInTheStart.body[0], 
    likes: Math.floor(Math.random()*1000)
  }

  await api
    .put(`/api/blogs/${updatedBlog.id}`)
    .send(updatedBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogsInTheEnd = (await api.get('/api/blogs')).body
  const blogsByLikes = blogsInTheEnd.map(b => b.likes)

  expect(blogsByLikes).toContain(updatedBlog.likes)
})

afterAll(() => {
  mongoose.connection.close()
})