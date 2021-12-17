const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('blogs are returned as json', () => {
   api.get('/api/blogs', (request, response) => {
    response
      .expect(200)
      .expect('Content-Type', /application\/json/)
   })
})

test('get returns correct amount of blogs', () => {
  api.get('/api/blogs', (request, response) => {
   response
     .expect(200)
     .expect('Content-Type', /application\/json/)
  })
})

afterAll(() => {
  mongoose.connection.close()
})