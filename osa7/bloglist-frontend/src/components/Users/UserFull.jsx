import React from 'react'

const UserInfo = ({ user }) => {

  if(!user) {
    return null
  }

  return(
    <div>
      <h3>{user.name}</h3>
      <ul>{user.blogs.map(blog => <li key={blog.id}>{blog.title}</li>)}</ul>
    </div>
  )
}

export default UserInfo