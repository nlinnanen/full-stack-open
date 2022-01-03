import React, { useState, useEffect } from 'react'
import Blog from './components/Blog.jsx'
import Login from './components/Login.jsx'
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

  const setMessageWithTimeout = newMessage => {
    setMessage(newMessage)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const handleLogOut = () => {
    setUser(null)
    setMessageWithTimeout({ message: 'Logged out', class: 'message' })
    window.localStorage.removeItem('loggedBloglistUser')
  }

  const handleLike = async blog => {
    const newBlog = await blogService.like(blog)
    const newBlogs = blogs.filter(b => b.id!==blog.id).concat(newBlog)
    setBlogs(newBlogs)
  }

  const handleDelete= async blog => {
    if(user.id === blog.user.id && window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      await blogService.remove(blog.id)
      setBlogs(blogs.filter(b => b.id!==blog.id))
    } else if (user.id === blog.user.id) {
      setMessageWithTimeout('Not the user that created the blog', 'error')
    }
  }

  const addBlog = async newBlog => {
    try {
      const response = await blogService.create(newBlog, user.token)
      setBlogs(blogs.concat(response.body))
      setMessageWithTimeout({ message: `Added "${response.title}"`, class: 'message' })
    } catch (execption) {
      setMessageWithTimeout({ message: execption, class: 'error' })
    }
  }


  if (user === null) {
    return (
      <div>
        <Error message={message} />
        <Login
          setUser={setUser}
          setMessageWithTimeout={setMessageWithTimeout}
        />
      </div>
    )
  } else {
    return (
      <div className='container'>
        <header>
          <Error message={message} />

          <h2>Blogs</h2>

          <p className='flex-space-apart'>
            {user.name} logged in <button onClick={handleLogOut}>Log out</button>
          </p>
        </header>

        <div className='blogForm'>
          <Togglable buttonLabel='Create new blog'>
            <BlogForm user={user} addBlog={addBlog}/>
          </Togglable>
        </div>

        <div className="blogs">
          {blogs
            .sort((a, b) => b.likes - a.likes)
            .map(blog =>
              <Blog
                key={blog.id}
                blog={blog}
                handleLike={() => handleLike(blog)}
                handleDelete={() => handleDelete(blog)}
              />
            )
          }
        </div>

      </div>
    )
  }
}

export default App