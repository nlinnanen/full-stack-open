import loginService from '../services/login'
import blogService from '../services/blogs'

const loginReducer = (state = null, action) => {
  switch (action.type) {
    case 'LOG_IN':
      return action.data

    case 'LOG_OUT':
      return null

    default:
      return state
  }
}

export const login = ({ username, password }) => {
  return async dispatch => {
    const user = await loginService.login({
      username, password
    })
    window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))
    blogService.setToken(user.token)
    dispatch({
      type: 'LOG_IN',
      data: user
    })
  }
}

export const logout = () => {
  return dispatch => {
    window.localStorage.setItem('loggedBloglistUser', '')
    dispatch({
      type: 'LOG_OUT'
    })
  }
}

export const initializeUser = () => {
  return async dispatch => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      dispatch({
        type: 'LOG_IN',
        data: user
      })
    }
  }
}

export default loginReducer