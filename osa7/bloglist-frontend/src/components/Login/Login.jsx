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
      dispatch(setError('Wrong credentials'))
    }

    setUsername('')
    setPassword('')
  }


  return (
    <form onSubmit={handleLogin}>
      <h2 className='text-xl my-1'>Log in to application</h2>
      <div className='flex place-content-between space-x-8'>
        <div className='capitalize'>username</div>
        <input
          type="text"
          value={username}
          id="username-input"
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div className='flex place-content-between space-x-8'>
        <div className='capitalize'>password</div>
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