import React, { useState } from 'react'
import blogService from '../services/blogs'
import loginService from '../services/login'

const Login = ({
  setMessageWithTimeout,
  setUser
}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    try {

      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))
      blogService.setToken(user.token)

      setMessageWithTimeout({ message: `Logged in as ${user.username}`, class: 'message' })

      setUser(user)
      setUsername('')
      setPassword('')

    } catch (exception) {
      setMessageWithTimeout({ message: 'wrong credentials', class: 'error' })
    }
  }


  return (
    <form onSubmit={handleLogin}>
      <h2>Log in to application</h2>
      <div>
        username
        <input
          type="text"
          value={username}
          id="username-input"
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          id="password-input"
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id="loginbutton" type="submit">Login</button>
    </form>
  )
}
export default Login