import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleVisibilty } from '../reducers/visibilityReducer'


const Togglable = (props) => {
  const dispatch = useDispatch()
  const show = useSelector(state => state.visibility)

  if(!show) {
    return (
      <div><button className="togglable-button" onClick={() => dispatch(toggleVisibilty())}>{props.buttonLabel}</button></div>
    )
  } else {
    return (
      <div>
        {props.children}
        <button className="cancel-togglabe" onClick={() => dispatch(toggleVisibilty())}>Cancel</button>
      </div>
    )
  }
}

export default Togglable