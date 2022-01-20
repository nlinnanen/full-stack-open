import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const message = useSelector(state => state.notification)
  if (!message.message) {
    return null
  }

  if (message.class === 'error') {
    return  (
      <div className='px-4 py-2 border-2 text-center w-1/2 bg-red-400 border-red-500 text-red-600 rounded'>{message.message}</div>
    )
  } else {
    return (
      <div className='px-4 py-2 border-2 text-center w-1/2 bg-green-200 border-green-500 text-green-600 rounded'>{message.message}</div>
    )
  }
}

export default Notification