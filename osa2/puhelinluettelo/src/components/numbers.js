
const Numbers = ({ persons, filter, removeNumber }) => {
  return (
    <>
      {persons
        .filter(p => p.name.toLowerCase().includes(filter))
        .map(p => {
        return(
          <div key={p.id}>
            {p.name}&nbsp;{p.number} <RemoveButton id={p.id} removeNumber={removeNumber}/>
          </div>
        )
        })}
    </>
  )
}

const RemoveButton = ({ id, removeNumber }) => <button onClick={() => removeNumber(id)}>delete</button>

export default Numbers