import React, { useState } from 'react'

const BlogForm = ({ user, addBlog }) => {
  const [newTitle,setNewTitle] = useState('')
  const [newAuthor,setNewAuthor] = useState('')
  const [newUrl,setNewUrl] = useState('')

  const handleNewBlog = async event => {
    event.preventDefault()

    addBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      user: user.id
    })

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <>
      <h2>New blog</h2>
      <form onSubmit={handleNewBlog}>

        <div className='inputfield'>
          title: <input id='title' type="text" onChange={(event) => setNewTitle(event.target.value)}/>
        </div>

        <div className='inputfield'>
          author: <input id='author' type="text" onChange={(event) => setNewAuthor(event.target.value)}/>
        </div>

        <div className='inputfield'>
          url: <input id='url' type="text" onChange={(event) => setNewUrl(event.target.value)}/>
        </div>

        <button type="submit">Add new</button>

      </form>
    </>
  )

}


export default BlogForm