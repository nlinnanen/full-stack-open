import React, { useState, useEffect } from 'react'
import Blog from './components/Blog.jsx'
import Login from './components/Login'
import Error from './components/Message'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable.jsx'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [user, setUser] = useState(null)


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const editMessage = newMessage => {
    setMessage(newMessage)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const handleLogOut = () => {
    setUser(null)
    editMessage({message: `Logged out`, class: 'message'})
    window.localStorage.removeItem('loggedBloglistUser')
  }

  if (user === null) {
    return (
      <div>
        <Error message={message} />
        <Login
        setUser={setUser}
        editMessage={editMessage}
        />
      </div>
    )
  } else {
    return (
      <div>
        <Error message={message} />
        <h2>Blogs</h2>
        <p>{user.name} logged in <button onClick={handleLogOut}>Log out</button></p>
        <Togglable buttonLabel='Create new blog'>
          <BlogForm user={user} editMessage={editMessage} blogs={blogs} setBlogs={setBlogs}/>
        </Togglable>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    )
  }
}

export default App