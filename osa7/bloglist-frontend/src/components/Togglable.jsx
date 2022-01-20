import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleVisibilty } from '../reducers/visibilityReducer'


const Togglable = (props) => {
  const dispatch = useDispatch()
  const show = useSelector(state => state.visibility)

  if(!show) {
    return (
      <div><button className="btn" onClick={() => dispatch(toggleVisibilty())}>{props.buttonLabel}</button></div>
    )
  } else {
    return (
      <div className=''>
        {props.children}
      </div>
    )
  }
}

export default Togglable