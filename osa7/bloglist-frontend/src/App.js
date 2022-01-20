import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Switch, Route } from 'react-router-dom'

import Login from './components/Login/Login.jsx'
import BlogForm from './components/BlogForm/BlogForm.jsx'
import Togglable from './components/Togglable.jsx'
import Blogs from './components/Blogs/Blogs.jsx'
import Header from './components/Header/Header.jsx'
import Notification from './components/Header/Notification/Notification.jsx'
import Users from './components/Users/Users.jsx'

import { initializeBlogs } from './reducers/blogReducer.js'
import { initializeUser } from './reducers/loginReducer.js'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  useEffect(() => {
    dispatch(initializeUser())
  }, [])

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])


  if (user === null) {
    return (
      <div className='flex flex-col justify-center items-center my-5'>
        <Notification />
        <Login />
      </div>
    )
  } else {
    return (
      <div className='flex flex-col justify-center items-center'>

        <Header />
        <h2 className='text-3xl'>Blog app</h2>
        <Switch>
          <Route path='/users'>
            <Users />
          </Route>
          <Route path='/blogs/:id'>
            <Blogs />
          </Route>
          <Route path='/'>
            <Togglable className='blogForm' buttonLabel='Create new blog'>
              <BlogForm user={user} />
            </Togglable>
            <Blogs />
          </Route>
        </Switch>

      </div>
    )
  }
}

export default App