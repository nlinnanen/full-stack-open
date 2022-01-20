import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../../reducers/loginReducer'
import { setError, setMessage } from '../../reducers/notificationReducer'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      dispatch(login({ username, password }))
      dispatch(setMessage(`Logged in as ${username}`))
    } catch (error) {
      setError('Wrong credentials')
    }

    setUsername('')
    setPassword('')
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