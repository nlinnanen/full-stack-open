import React, { useState } from 'react'

const Togglable = (props) => {
  const [show, setShow] = useState(false)

  if(!show) {
    return (
      <button className="togglable-button" onClick={() => setShow(true)}>{props.buttonLabel}</button>
    )
  } else {
    return (
      <>
        {props.children}
        <button className="cancel-togglabe" onClick={() => setShow(false)}>Cancel</button>
      </>
    )
  }
}

export default Togglable