import { useQuery } from '@apollo/client'
import { useState } from 'react'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  const [selectedGenre, setSelectedGenre] = useState(undefined)
  const result = useQuery(ALL_BOOKS, { variables: {genre: selectedGenre} })

  if (!props.show) {
    return null
  }
  
  if(result.loading) {
    return <p>Loading...</p>
  }

  const books = result.data.allBooks
  const genres = [...new Set(books.reduce((a, b) => a.concat(b.genres), []))]
  
  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {genres.map((genre) => {
        return (
          <button onClick={() => setSelectedGenre(genre)} key={genre}>{genre}</button>
        )
      })}
      <button onClick={() => setSelectedGenre(undefined)}>all genres</button>
    </div>
  )
}

export default Books
