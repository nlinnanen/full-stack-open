import { useQuery } from "@apollo/client"
import { ALL_BOOKS, ME } from "../queries"


const Recommend = ({show}) => {
  const meResult = useQuery(ME)
  const bookResult = useQuery(ALL_BOOKS, { variables: {genre: meResult.data?.me.favoriteGenre} })
  if(!show) {
    return null
  }

  if(meResult.loading) {
    return(
      <div>Loading...</div>
    )
  }

  const genre = meResult.data.me.favoriteGenre
  const books = bookResult.data.allBooks
  return (
    <div>
      <h1>recommendations</h1>
      <p>books in your favorite genre {genre}</p>
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
    </div>
  )
}

export default Recommend