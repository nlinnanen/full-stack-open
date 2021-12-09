
const Numbers = ({ persons, filter, removeNumber }) => {
  return (
    <div class="persons">
      <div className="flex-space-between persons-header"><div class="name heading">Name</div> <div class="number heading">Number</div><div></div></div>
      {persons
        .filter(p => p.name.toLowerCase().includes(filter))
          .map(p => {
          return(
            <div key={p.id} class="flex-space-between person">
              <div class="name">{p.name}</div> <div classs="number">{p.number} </div><RemoveButton id={p.id} removeNumber={removeNumber}/>
            </div>
          )
          })}
    </div>
  )
}

const RemoveButton = ({ id, removeNumber }) => <button onClick={() => removeNumber(id)}>delete</button>

export default Numbers