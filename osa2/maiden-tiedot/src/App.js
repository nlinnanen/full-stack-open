import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Result from './components/result'

function App() {
  const [ countries, setCountries ] = useState([])

  const [ filterBy, setFilterBy ] = useState('')

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  
  return (
    <div>
      <Filter filterBy={filterBy} setFilterBy={setFilterBy}/>
      <Result filterBy={filterBy} countries={countries} setFilterBy={setFilterBy}/>
    </div>
  );
}



const Filter = ({filterBy, setFilterBy}) => {

  const handleFilterChange = (event) => {
    setFilterBy(event.target.value)
  }

  return(
    <form><input type="text" value={filterBy} onChange={handleFilterChange}/></form>
  )
}



export default App;
