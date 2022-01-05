import React, { useState, useImperativeHandle } from 'react'

const Togglable = React.forwardRef((props, ref) => {
  const [show, setShow] = useState(false)

  const toggleVisibilty = () => {
    setShow(!show)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibilty
    }
  })

  if(!show) {
    return (
      <button className="togglable-button" onClick={toggleVisibilty}>{props.buttonLabel}</button>
    )
  } else {
    return (
      <>
        {props.children}
        <button className="cancel-togglabe" onClick={toggleVisibilty}>Cancel</button>
      </>
    )
  }
})

Togglable.displayName = 'Togglable'

export default Togglable