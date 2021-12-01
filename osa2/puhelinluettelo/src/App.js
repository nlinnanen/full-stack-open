import React, { useEffect, useState } from 'react'
import axios from 'axios'

import PersonForm from './components/personForm'
import Numbers from './components/numbers'
import Filter from './components/filter'


const App = () => {
  const [persons, setPersons] = useState([
    { 
      name: 'Arto Hellas',
      number: '1234'
    }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterWith, setFilterWith] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons').then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

  const addNumber = (event) => {
    event.preventDefault()

    const personObject = { 
      name: newName,
      number: newNumber
    }

    if(persons.every(p => p.name !== newName)) {
      setPersons(persons.concat(personObject))
    } else {
      alert(`${newName} is already added to phonebook`)
    }

    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilterWith(event.target.value.toLowerCase())
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter handleFilterChange={handleFilterChange} filterWith={filterWith}/>

      <h2>add a new</h2>

      <PersonForm handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} newName={newName} newNumber={newNumber} addNumber={addNumber}/>
    
      <h2>Numbers</h2>

      <Numbers persons={persons} filter={filterWith}/>
    </div>
  )

}

export default App
