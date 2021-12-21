const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

const { initialBlogs, initialUsersGenerator, getTokenFor } = require('./test_helper')
let initialUsers = [{}]

beforeAll(async () => {
  initialUsers = await initialUsersGenerator()

})

beforeEach(async () => {
  await User.deleteMany({})
  await User.insertMany(initialUsers)
  
  await Blog.deleteMany({})

  const users = await User.find({})
  const intialBlogsWithUser = initialBlogs.map((b, i) => {
    return { ...b, user: users[i % users.length]._id }
  })

  await Blog.insertMany(intialBlogsWithUser)
})

describe('Get method', () => {
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
})

describe('Posting blogs', () => {
  test('post writes correct data to database', async () => {

    const user = await User.findOne({})
    const token = getTokenFor(user)

    const newBlog = {
      title: 'Another fun blog',
      author: 'Tiina Teekkari',
      url: 'www.tiina.com',
      likes: 4
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set({ Authorization: `bearer ${token}` })
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    const titles = response.body.map(r => r.title)

    expect(response.body).toHaveLength(initialBlogs.length + 1)
    expect(titles).toContain(newBlog.title)


  })

  test('default value to likes is 0', async () => {

    const user = await User.findOne({})
    const token = getTokenFor(user)

    const newBlog = {
      title: 'Another fun blog',
      author: 'Tiina Teekkari',
      url: 'www.tiina.com',
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set({ Authorization: `bearer ${token}` })
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    const likes = response.body.map(r => r.likes)

    expect(response.body).toHaveLength(initialBlogs.length + 1)
    expect(likes).toContain(0)

  })

  test('if title is undefined status is 400 and the error message is relevant', async () => {
    const user = await User.findOne({})
    const token = getTokenFor(user)

    const newBlog = {
      author: 'Tiina Teekkari',
      url: 'www.tiina.com',
    }

    const result = await api
      .post('/api/blogs')
      .send(newBlog)
      .set({ Authorization: `bearer ${token}` })
      .expect(400)

    expect(result.body.error).toContain('title')

  })

  test('if url is undefined status is 400 and the error message is relevant', async () => {
    const user = await User.findOne({})
    const token = getTokenFor(user)
    const newBlog = {
      title: 'even more fun blogs',
      author: 'Tiina Teekkari'
    }

    const result = await api
      .post('/api/blogs')
      .send(newBlog)
      .set({ Authorization: `bearer ${token}` })
      .expect(400)

    expect(result.body.error).toContain('url')

  })

  test('if token is undefined status is 401 and error relevant', async () => {
    const user = await User.findOne({})
    const newBlog = {
      title: 'even more fun blogs',
      author: 'Tiina Teekkari'
    }

    const result = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)

    expect(result.body.error).toContain('token')

  })


})


describe('Deleting blogs', () => {

  test('deleting a blog works', async () => {
    const blogsInTheStart = await api.get('/api/blogs')
    const blogToDelete = blogsInTheStart.body[0]
    const idToDelte = blogToDelete.id
    const user = await User.findById(blogToDelete.user.id)
    const token = getTokenFor(user)

    await api
      .delete(`/api/blogs/${idToDelte}`)
      .set({ Authorization: `bearer ${token}` })
      .expect(204)

    const blogsInTheEnd = await api.get('/api/blogs')

    expect(blogsInTheEnd.body).toHaveLength(blogsInTheStart.body.length - 1)

    const idsInResult = blogsInTheEnd.body.map(blog => blog.id)
    expect(idsInResult).not.toContain(idToDelte)

  })

  test('Without token status is 401 and error relevant', async () => {
    const blogsInTheStart = await api.get('/api/blogs')
    const blogToDelete = blogsInTheStart.body[0]
    const idToDelte = blogToDelete.id
    const user = await User.findById(blogToDelete.user.id)

    const result = await api
      .delete(`/api/blogs/${idToDelte}`)
      .expect(401)

    expect(result.body.error).toContain('Token')

  })

})


describe('Updating blogs', () => {

  test('updating a blog works', async () => {
    const blogsInTheStart = await api.get('/api/blogs')
    const updatedBlog = {
      ...blogsInTheStart.body[0],
      likes: Math.floor(Math.random() * 1000)
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

})

afterAll(() => {
  mongoose.connection.close()
})