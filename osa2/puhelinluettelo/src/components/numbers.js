import react from "react"

const Numbers = ({ persons, filter }) => {
  return (<>
    {persons.filter(p => p.name.toLowerCase().includes(filter))
      .map(p => <Information name={p.name} number={p.number} />)}
  </>)
}

const Information = ({ name, number }) => <p key={name}>{name}&nbsp;{number}</p>

export default Numbers