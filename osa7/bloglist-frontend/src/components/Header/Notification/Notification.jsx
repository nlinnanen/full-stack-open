import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const message = useSelector(state => state.notification)
  return !message.message ? null : (
    <div className={`notification ${message.class}`}>{message.message}</div>
  )
}

export default Notification