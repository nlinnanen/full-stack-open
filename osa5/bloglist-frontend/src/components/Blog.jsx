import React from 'react'
import { useState } from 'react'

const Blog = ({blog}) => {
  const [showInfo, setShowInfo] = useState(false)

  if(showInfo) {
    return (
      <div className='blogInfo full'>
        <div className='flex-space-apart'>
          {blog.title}<button onClick={() => setShowInfo(false)}>hide</button>
        </div>
        <div>{blog.url}</div>
        <div className='flex-space-apart'>
          Likes &nbsp; {blog.likes} <button onClick={() => setShowInfo(false)}>Like</button>
        </div>
        <div>{blog.user.username}</div>
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

export default Blog