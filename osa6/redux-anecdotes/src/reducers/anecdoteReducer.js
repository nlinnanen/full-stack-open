import anecdoteService from '../services/anecdoteService'

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD':
      return [...state, action.data]
    
    case 'VOTE':
      const id = action.data.id
      return state.map(anecdote => 
        anecdote.id === id 
          ? action.data
          : anecdote
      )

    case 'INIT_ANECDOTES':
      return action.data
  
    default:
      return state
}
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'ADD',
      data: newAnecdote
    })
  }
}

export const voteCreator = anecdote => {
  return async dispatch => {
    const votedAnecdote = await anecdoteService.vote(anecdote)
    dispatch({
      type: 'VOTE',
      data: votedAnecdote
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export default anecdoteReducer