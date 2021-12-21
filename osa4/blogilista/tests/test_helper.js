const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const Blog = require('../models/blog')
const User = require('../models/user')



const initialUsersGenerator = async () => {

  const usersWithoutHash = [
    {
      'username': 'tiinat',
      'name': 'Tiina Teekkari',
      'password': 'password123'
    },
    {
      'username': 'tteekkari123_:M;*^`?`=?',
      'name': 'Teemu Teekkari',
      'password': 'ossinlampi'
    }]

  const hashedPasswords = await Promise.all(
    usersWithoutHash.map(u => bcrypt.hash(u.password, 10))
  )

  const hashedUsers = usersWithoutHash.map((user, i) => {
    return {
      username: user.username,
      name: user.name,
      passwordHash: hashedPasswords[i]
    }
  })

  return hashedUsers

}

const initialBlogs = [
  {
    'title': 'Another fun blog',
    'author': 'Tiina Teekkari',
    'url': 'www.tiina.com',
    'likes': 4
  },
  {
    'title': 'Fun blog',
    'author': 'Teemu Teekkari',
    'url': 'www.teemu.com',
    'likes': 123
  }
]

const getTokenFor = (user) => {
  return jwt.sign({ username: user.username, id: user._id }, process.env.SECRET)
}

module.exports = {
  initialBlogs,
  initialUsersGenerator,
  getTokenFor
}