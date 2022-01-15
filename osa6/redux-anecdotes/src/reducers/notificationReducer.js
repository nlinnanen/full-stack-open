
var lasTimeoutId 

const notificationReducer = (state = '', action) => {
  console.log(action)
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.data
    case 'CLEAR_NOTIFICATION':
      return ''
    default:
      return state
  }
}

export const notificationChange = (notification, time) => {
  return dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: notification
    })

    if(lasTimeoutId) {
      clearTimeout(lasTimeoutId)
    }

    lasTimeoutId = setTimeout(() => 
      dispatch({type: 'CLEAR_NOTIFICATION'})
    , time*1000)
  }
}

export default notificationReducer