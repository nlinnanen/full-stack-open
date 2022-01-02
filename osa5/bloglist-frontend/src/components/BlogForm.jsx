import React, { useState } from 'react'
import blogsService from '../services/blogs'

const BlogForm = ({ user, editMessage, blogs, setBlogs }) => {
  const [newTitle,setNewTitle] = useState('')
  const [newAuthor,setNewAuthor] = useState('')
  const [newUrl,setNewUrl] = useState('')

  const handleNewBlog = async (event) => {
    const newBlog = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      user: user.id
    }
    
    try {
      const response = await blogsService.create(newBlog, user.token)
      setBlogs(blogs.concat(response.body))
      editMessage({message: `Added "${response.title}"`, class: 'message'})
      setNewTitle('')
      setNewAuthor('')
      setNewUrl('')
    } catch (execption) {
      editMessage({message: execption, class: 'error'})
    }
  }

  return (
    <>
      <h2>New blog</h2>
      <form onSubmit={handleNewBlog}>
        <div className='inputfield'>title: <input type="text" onChange={(event) => setNewTitle(event.target.value)}/></div>
        <div className='inputfield'>author: <input type="text" onChange={(event) => setNewAuthor(event.target.value)}/></div>
        <div className='inputfield'>url: <input type="text" onChange={(event) => setNewUrl(event.target.value)}/></div>
        <button type="submit">Add new</button>
      </form>
    </>
  )

}


export default BlogForm