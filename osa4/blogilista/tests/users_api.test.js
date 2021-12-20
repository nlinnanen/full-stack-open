const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const app = require('../app')

const api = supertest(app)

const User = require('../models/user')

const initialUsers = [
  {
    'username': 'tiinat',
    'name': 'Tiina Teekkari',
    'password': 'password123'
  },
  {
    'username': 'tteekkari123_:M;*^`?`=?',
    'name': 'Teemu Teekkari',
    'password': 'ossinlampi'
  }
]


beforeEach(async () => {
  await User.deleteMany({})

  const hashedPasswords = await Promise.all(initialUsers.map(u => bcrypt.hash(u.password, 10)))
  const hashedUsers = initialUsers.map((user, i) => {
    return {
      username: user.username,
      name: user.name,
      passwordHash: hashedPasswords[i]
    }
  })

  await User.insertMany(hashedUsers)
})

describe('Getting the users', () => {
  test('Users are returned as json', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('get returns correct amount of users', async () => {
    const response = await api.get('/api/users')

    expect(response.body).toHaveLength(initialUsers.length)
  })

  test('get has field "id"', async () => {
    const response = await api.get('/api/blogs')

    response.body.forEach(element => {
      expect(element.id).toBeDefined()
    })
  })

  test('get does not include password', async () => {
    const response = await api.get('/api/blogs')

    response.body.forEach(element => {
      expect(element.passwordHash).not.toBeDefined()
    })

  })

})

describe('Posting users', () => {
  test('post writes correct data to database', async () => {

    const newUser = {
      name: 'Mikko',
      username: 'xxxDragonSlayerxxx',
      password: 'password123'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/users')

    const usernames = response.body.map(r => r.username)

    expect(response.body).toHaveLength(initialUsers.length + 1)
    expect(usernames).toContain(newUser.username)


  })

  test('if username is undefined status is 400', async () => {

    const newUser = {
      name: 'Essi Esimerkki',
      password: '12334567890'
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    expect(response.body.error).toContain('User validation failed: username: Path `username` is required.')

    const usersInEnd = (await api.get('/api/users')).body
    expect(usersInEnd).toHaveLength(initialUsers.length)
  })

  test('if password is undefined status is 400', async () => {

    const newUser = {
      username: 'essi',
      name: 'Essi Esimerkki'
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    expect(response.body.error).toContain('Password is required')

    const usersInEnd = (await api.get('/api/users')).body
    expect(usersInEnd).toHaveLength(initialUsers.length)
  })

  test('if password is too short status is 400', async () => {

    const newUser = {
      username: 'essi',
      name: 'Essi Esimerkki',
      password: 'j'
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    expect(response.body.error).toContain('Password must be atleast 3 characters long')

    const usersInEnd = (await api.get('/api/users')).body
    expect(usersInEnd).toHaveLength(initialUsers.length)

  })

  test('if username is too short status is 400', async () => {

    const newUser = {
      username: 'e',
      name: 'Essi Esimerkki',
      password: 'jdgdfgdfg'
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    expect(response.body.error).toContain('short')

    const usersInEnd = (await api.get('/api/users')).body
    expect(usersInEnd).toHaveLength(initialUsers.length)

  })

  test('if username is not unique status is 400', async () => {

    const newUser = {
      username: initialUsers[0].username,
      name: 'Essi Esimerkki',
      password: 'jdgdfgdfg'
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    expect(response.body.error).toContain('unique')

    const usersInEnd = (await api.get('/api/users')).body
    expect(usersInEnd).toHaveLength(initialUsers.length)

  })

})

afterAll(() => {
  mongoose.connection.close()
})