var lastTimeoutId

const notificationReducer = (state = { message: null }, action) => {
  switch (action.type) {
    case 'ERROR':
      return { message: action.data, class: 'error' }
    case 'MESSAGE':
      return { message: action.data, class: 'message' }
    case 'CLEAR_NOTIFICATION':
      return { message: null }
    default:
      return state
  }
}

const notificationChange = (notification, type) => {
  return dispatch => {
    dispatch({
      type,
      data: notification
    })

    if(lastTimeoutId) {
      clearTimeout(lastTimeoutId)
    }

    lastTimeoutId = setTimeout(() =>
      dispatch({ type: 'CLEAR_NOTIFICATION' })
    , 5000)
  }
}

export const setError = (message) => notificationChange(message, 'ERROR')

export const setMessage = (message) => notificationChange(message, 'MESSAGE')


export default notificationReducer