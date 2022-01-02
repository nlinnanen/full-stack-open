import React, { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const Blog = ({ blog, setBlogs, blogs }) => {
  const [showInfo, setShowInfo] = useState(false)


  const handleLike = async () => {
    const newBlog = await blogService.like(blog)
    const newBlogs = blogs.filter(b => b.id!==blog.id).concat(newBlog)
    setBlogs(newBlogs)
  }

  const handleDelte= async () => {
    if(window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      await blogService.remove(blog.id)
      setBlogs(blogs.filter(b => b.id!==blog.id))
    }
  }

  if(showInfo) {
    return (
      <div className='blogInfo full'>
        <div className='flex-space-apart'>
          {blog.title}
          <button onClick={() => setShowInfo(false)}>hide</button>
        </div>
        <div>{blog.url}</div>
        <div className='flex-space-apart'>
          Likes &nbsp; {blog.likes}
          <button onClick={handleLike}>Like</button>
        </div>
        <div>{blog.user.username}</div>
        <div><button onClick={handleDelte}>Delete</button></div>
      </div>
    )
  } else {
    return (
      <div className='blogInfo'>
        <div className='flex-space-apart'>
          {blog.title} {blog.author}
          <button onClick={() => setShowInfo(true)}>view</button>
        </div>
      </div>
    )
  }
}

Blog.propTypes = {
  blog: PropTypes.string.isRequired,
  setBlogs: PropTypes.func.isRequired,
  blogs: PropTypes.object.isRequired
}

export default Blog