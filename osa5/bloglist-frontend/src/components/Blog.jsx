import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, handleLike, handleDelete }) => {
  const [showInfo, setShowInfo] = useState(false)

  if(showInfo) {
    return (
      <div className='blogInfo full'>
        <div className='flex-space-apart titleAndAuthor'>
          {blog.title} {blog.author}
          <button onClick={() => setShowInfo(false)}>hide</button>
        </div>
        <div>
          {blog.url}
        </div>
        <div className='flex-space-apart like-container'>
          Likes &nbsp; {blog.likes}
          <button className='like-btn' onClick={handleLike}>Like</button>
        </div>
        <div>
          {blog.user.name}
        </div>
        <div>
          <button className='delete-btn' onClick={handleDelete}>Delete</button>
        </div>
      </div>
    )
  } else {
    return (
      <div className='blogInfo'>
        <div className='flex-space-apart'>
          {blog.title} {blog.author}
          <button className='view-btn' onClick={() => setShowInfo(true)}>view</button>
        </div>
      </div>
    )
  }
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleLike: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired
}

export default Blog