import React, { useState } from 'react'
import { createBlog } from '../../reducers/blogReducer'
import { useDispatch } from 'react-redux'
import { toggleVisibilty } from '../../reducers/visibilityReducer'
import { setError, setMessage } from '../../reducers/notificationReducer'

const BlogForm = () => {
  const [newTitle,setNewTitle] = useState('')
  const [newAuthor,setNewAuthor] = useState('')
  const [newUrl,setNewUrl] = useState('')
  const dispatch = useDispatch()

  const handleNewBlog = async event => {
    event.preventDefault()
    const newBlog = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')

    try {
      dispatch(createBlog(newBlog))
      dispatch(toggleVisibilty())
      dispatch(setMessage(`Added "${newBlog.title}"`))
    } catch (error) {
      dispatch(setError('Invalid blog'))
    }
  }

  return (
    <>
      <h2 className='text-xl'>New blog</h2>
      <form onSubmit={handleNewBlog} className='my-4'>

        <div className='flex place-content-between space-x-5'>
          <div>title:</div> <input value={newTitle} id='title' type="text" onChange={event => setNewTitle(event.target.value)}/>
        </div>

        <div className='flex place-content-between space-x-5'>
          <div>author:</div> <input value={newAuthor} id='author' type="text" onChange={event => setNewAuthor(event.target.value)}/>
        </div>

        <div className='flex place-content-between space-x-5'>
          <div>url:</div> <input value={newUrl} id='url' type="text" onChange={event => setNewUrl(event.target.value)}/>
        </div>

        <button className='col-span-1' type="submit">Add new</button>
        <button className="" onClick={() => dispatch(toggleVisibilty())}>Cancel</button>
      </form>
    </>
  )

}


export default BlogForm