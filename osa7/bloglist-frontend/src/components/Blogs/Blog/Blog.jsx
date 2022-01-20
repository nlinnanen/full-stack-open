import React from 'react'
import PropTypes from 'prop-types'
import { deleteBlog, likeBlog } from '../../../reducers/blogReducer'
import { useDispatch } from 'react-redux'
import { setError, setMessage } from '../../../reducers/notificationReducer'


const Blog = ({ blog }) => {
  const dispatch = useDispatch()

  const handleLike = () => {
    try {
      dispatch(likeBlog(blog))
      dispatch(setMessage(`Liked blog "${blog.title}"`))
    } catch (error) {
      dispatch(setError('Something went wrong'))
    }
  }

  const handleDelete = () => {
    try {
      dispatch(deleteBlog(blog))
      dispatch(setMessage(`Removed blog "${blog.title}"`))
    } catch (error) {
      dispatch(setError('Invalid user'))
    }
  }

  return (
    <div className='blogInfo full'>
      <div className='flex-space-apart titleAndAuthor'>
        {blog.title} {blog.author}
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
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired
}

export default Blog