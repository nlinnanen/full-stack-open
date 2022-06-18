import { useMutation, useQuery } from '@apollo/client'
import { useState } from 'react'
import Select from 'react-select'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS)
  const [ editBook ] = useMutation(EDIT_AUTHOR)
  const [selectedName, setSelectedName] = useState("")
  const [setBornTo, setSetBornTo] = useState("")

  const submit = async (event) => {
    event.preventDefault()
    console.log(selectedName)
    editBook({ variables: { name: selectedName.value, setBornTo: parseInt(setBornTo)}})
    setSetBornTo('')
    setSelectedName('')
  }


  if (!props.show) {
    return null
  }

  if(result.loading) {
    return <p>Loading...</p>
  }
  
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {result.data.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>set birthyear</h2>
      <form onSubmit={submit}>
        <Select
          defaultValue={selectedName}
          onChange={setSelectedName}
          options={result.data.allAuthors.map(a => {
            return {
              value: a.name,
              label: a.name
            }
          })}
        />
        <div>
          birthyear 
          <input value={setBornTo} type="number" onChange={({ target }) => setSetBornTo(target.value)}/>
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default Authors
