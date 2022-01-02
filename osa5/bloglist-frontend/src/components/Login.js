import { useState } from "react"
import blogService from '../services/blogs'
import loginService from '../services/login'

const Login = ({
  editMessage,
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

      editMessage({ message: `Logged in as ${user.username}`, class: 'message' })

      setUser(user)
      setUsername('')
      setPassword('')

    } catch (exception) {
      editMessage({ message: 'wrong credentials', class: 'error' })
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
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  )
}
export default Login