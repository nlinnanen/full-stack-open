import { voteCreator } from '../reducers/anecdoteReducer'
import { notificationChange } from '../reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <p>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </p>
  )
}

const AnecdoteList = () => {
  const anecdotes = useSelector(state => 
    state
      .anecdotes
      .filter(anecdote => 
        anecdote
          .content
          .toLowerCase()
          .includes(state.filter)
      )
  )
  const dispatch = useDispatch()

  const vote = anecdote => {
    dispatch(voteCreator(anecdote))
    dispatch(notificationChange(`Voted for "${anecdote.content}"`, 5))
  }

  return (
    <>
      {anecdotes
        .sort((a, b) => b.votes - a.votes)
        .map(anecdote =>
          <Anecdote key={anecdote.id} anecdote={anecdote} handleClick={() => vote(anecdote)} />
        )}
    </>
  )
}


export default AnecdoteList