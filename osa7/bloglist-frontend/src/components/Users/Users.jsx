import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  Switch,
  Route,
  Link,
  useRouteMatch
} from 'react-router-dom'
import UserFull from './UserFull'
import { initializeUsers } from '../../reducers/userReducer'

const Users = () => {
  const users = useSelector(state => state.users)
  const match = useRouteMatch('/users/:id')
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeUsers())
  }, [])

  if (!users) {
    return null
  }

  const usersByBlogCount = users.map(user => { return { ...user, blogs: user.blogs.length } })
  const userMatch = match
    ? users.find(user => user.id === match.params.id)
    : null

  return (
    <Switch>
      <Route path='/users/:id'>
        <UserFull user={userMatch} />
      </Route>
      <Route path='/users'>
        <div>
          <div className='flex-space-apart'>
            <div><strong>User</strong></div> <div><strong>Blogs created</strong></div>
          </div>
          {usersByBlogCount.map(user => <UserBlogcount key={user.id} user={user} />)}
        </div>
      </Route>
    </Switch>

  )
}

const UserBlogcount = ({ user }) => {
  return (
    <div className='flex-space-apart'>
      <div><Link to={`/users/${user.id}`}>{user.name}</Link></div> <div>{user.blogs}</div>
    </div>
  )
}


export default Users

