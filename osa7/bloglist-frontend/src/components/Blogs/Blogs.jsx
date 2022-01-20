import React from 'react'
import { useSelector } from 'react-redux'
import {
  Switch,
  Route,
  Link,
  useRouteMatch
} from 'react-router-dom'
import Blog from './Blog/Blog'

const Blogs = () => {
  const blogs = useSelector(state => state.blogs)
  const match = useRouteMatch('/blogs/:id')

  const blogMatch = match
    ? blogs.find(blog => blog.id === match.params.id)
    : null

  return (
    <Switch>
      <Route path='/blogs/:id'>
        <Blog blog={blogMatch} />
      </Route>
      <Route path='/'>
        <div className="blogs">
          <h2 className='text-xl'>Blogs</h2>
          {blogs
            .sort((a, b) => b.likes - a.likes)
            .map(blog =>
              <div key={blog.id}>
                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
              </div>
            )
          }
        </div>
      </Route>
    </Switch>

  )
}

export default Blogs