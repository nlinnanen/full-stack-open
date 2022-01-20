import userService from '../services/user'

const userReducer = (state=null, action) => {
  switch (action.type) {
    case 'INITIALIZE':
      return action.data

    default:
      return state
  }
}


export const initializeUsers = () => {
  return async dispatch => {
    const users = await userService.getAll()
    return dispatch({
      type: 'INITIALIZE',
      data: users
    })
  }
}

export default userReducer