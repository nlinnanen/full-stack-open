import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books.jsx'
import NewBook from './components/NewBook'
import LoginForm from './components/Loginform'
import { useApolloClient, useSubscription } from '@apollo/client'
import Recommend from './components/Recommend'
import { ALL_BOOKS, BOOK_ADDED } from './queries'

const App = () => {
  const [token, setToken] = useState(null)
  const [page, setPage] = useState('authors')
  const client = useApolloClient()

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded;
      window.alert(`New book added: ${addedBook.title}`);
      [...addedBook.genres, undefined].forEach(genre => {
        client.cache.updateQuery({ query: ALL_BOOKS, variables: { genre } }, ({ allBooks }) => {
          return {
            allBooks: allBooks.concat(addedBook),
          }
        })
      })
    },
  })


  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token && <button onClick={() => setPage('add')}>add book</button>}
        {token && <button onClick={() => setPage('reommend')}>recommended</button>}
        {token && <button onClick={logout}>logout</button>}
        {!token && <button onClick={() => setPage('login')}>login</button>}
      </div>

      <Authors show={page === 'authors'} />

      <Books show={page === 'books'} />

      <NewBook show={page === 'add'} />

      <LoginForm show={page === 'login'} setToken={setToken}/>

      <Recommend show={page === 'reommend'} />
      
    </div>
  )
}

export default App
