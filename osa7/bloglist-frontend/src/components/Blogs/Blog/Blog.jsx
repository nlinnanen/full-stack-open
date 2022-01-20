import React from 'react'
import PropTypes from 'prop-types'
import { deleteBlog, likeBlog, commentBlog } from '../../../reducers/blogReducer'
import { useDispatch } from 'react-redux'
import { setError, setMessage } from '../../../reducers/notificationReducer'


const Blog = ({ blog }) => {
  const dispatch = useDispatch()

  if(!blog) {
    return null
  }

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

  const handleComment = (event) => {
    event.preventDefault()
    const comment = event.target.comment.value
    event.target.comment.value = ''
    try {
      dispatch(commentBlog(comment, blog))
      dispatch(setMessage(`Commented "${comment}"`))
    } catch (error) {
      dispatch(setError('Something went wrong'))
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
        Added by {blog.user.name}
      </div>
      <div>
        <button className='delete-btn' onClick={handleDelete}>Delete</button>
      </div>
      <div>
        <h3>comments</h3>
        <form onSubmit={handleComment}>
          <input type='text' name='comment'/>
          <button type='submit'>add comment</button>
        </form>
        <ul>
          {blog.comments.map((comment, i) =>
            <li key={i}>{comment}</li>
          )}
        </ul>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired
}

export default Blog