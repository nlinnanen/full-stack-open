import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import blogReducer from './reducers/blogReducer'
import notificationReducer from './reducers/notificationReducer'
import userReducer from './reducers/userReducer'
import loginReducer from './reducers/loginReducer'
import visibilityReducer from './reducers/visibilityReducer'

const reducer = combineReducers({
  blogs: blogReducer,
  notification: notificationReducer,
  user: loginReducer,
  users: userReducer,
  visibility: visibilityReducer,
})

export default createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))
