const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

// test('get returns correct amount of blogs', async () => {
//   response = await api.get('/api/blogs')
  
//   expect(response.body).toHaveLength(0)
// })

afterAll(() => {
  mongoose.connection.close()
})