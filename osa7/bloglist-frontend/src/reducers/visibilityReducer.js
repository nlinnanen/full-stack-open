
const visibilityReducer = (state = false, action) => {
  switch (action.type) {
    case 'TOGGLE':
      return !state

    default:
      return state
  }
}

export const toggleVisibilty = () => {
  return dispatch => {
    dispatch({
      type: 'TOGGLE',
    })
  }
}

export default visibilityReducer