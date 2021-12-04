import React, { useEffect, useState } from 'react'

import PersonForm from './components/personForm'
import Numbers from './components/numbers'
import Filter from './components/filter'

import services from './services'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterWith, setFilterWith] = useState('')

  useEffect(() => {
    services
      .getAll()
      .then((response) => setPersons(response))
  }, [])

  const addNumber = (event) => {
    event.preventDefault()

    const personObject = {
      name: newName,
      number: newNumber
    }

    if (persons.every(p => p.name !== newName)) {
      services
        .create(personObject)
        .then(response => setPersons(persons.concat(response)))
    } else if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        updateNumber({... personObject, id: persons.find(p => p.name === newName).id})
    }

    setNewName('')
    setNewNumber('')
  }

  const removeNumber = (id) => {
    if(window.confirm(`Delete ${persons.find(p => p.id === id).name}`)) {
      services
        .remove(id)
        .then(response => {
          setPersons(persons.filter(person => person.id !== id))
        })
    }
  }

  const updateNumber = (newObject) => {
    services
      .update(newObject)
      .then(response => {
        setPersons(persons.map(person => person.id !== response.id ? person : response))
      })
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

      <Filter handleFilterChange={handleFilterChange} filterWith={filterWith} />

      <h2>add a new</h2>

      <PersonForm handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} newName={newName} newNumber={newNumber} addNumber={addNumber} />

      <h2>Numbers</h2>

      <Numbers persons={persons} filter={filterWith} removeNumber={removeNumber}/>
    </div>
  )

}

export default App
