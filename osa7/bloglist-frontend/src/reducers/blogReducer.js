/* eslint-disable no-case-declarations */
import blogService from '../services/blogs'

const blogsReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD':
      return [...state, action.data]

    case 'REMOVE':
      return state.filter(b => b.id !== action.data.id)

    case 'LIKE':
      const idToLike = action.data.id
      return state.map(blog =>
        blog.id !== idToLike ? blog : action.data
      )

    case 'INIT_BLOGS':
      return action.data

    default:
      return state
  }
}

export const createBlog = (blog) => {
  return async dispatch => {
    const newBlog = await blogService.create(blog)
    // toggleVisibilty() TODO: make use reduce
    dispatch({
      type: 'ADD',
      data: newBlog
    })
  }
}

export const likeBlog = blog => {
  return async dispatch => {
    const likedBlog = await blogService.like(blog)
    dispatch({
      type: 'LIKE',
      data: likedBlog
    })
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const deleteBlog = (blog) => {
  return async dispatch => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      await blogService.remove(blog.id)
      dispatch({
        type: 'REMOVE',
        data: { id: blog.id }
      })

    }

  }
}



export default blogsReducer