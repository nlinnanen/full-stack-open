import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Notification from './Notification/Notification.jsx'
import { Link } from 'react-router-dom'
import { logout } from '../../reducers/loginReducer.js'
import { setMessage } from '../../reducers/notificationReducer'

const Header = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const handleLogout = () => {
    dispatch(logout())
    dispatch(setMessage('Logged out'))
  }

  return (
    <div className='flex flex-col items-center'>
      <header className='flex space-x-10 items-center'>
        <Link to='/blogs'>blogs</Link>
        <Link to='/users'>users</Link>
        <span>{user.name} logged in</span>
        <button className='btn' onClick={handleLogout}>Log out</button>
      </header>
      <Notification />
    </div>
  )

}

export default Header