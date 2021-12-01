import React from "react"

import SingleCountry from "./singleCountry"


const Result = ({filterBy, countries, setFilterBy}) => {
    const filtered = countries.filter(country => 
      country
        .name
        .common
        .toLowerCase()
        .includes(filterBy.toLowerCase())
    )
  
    if(filtered.length>10 || filtered.length===0) {

      return(
        <div>
          Too many matches, specify another filter
        </div>
        )

    } else if(filtered.length>1){

      return (
        <div>
          {filtered.map(country => 
            <MultipleCountries name={country.name.common} setFilterBy={setFilterBy} key={country.ccn3}/>
          )}
        </div>
      )

    } else if(filtered.length===1) {

      return (
        <SingleCountry country={filtered[0]}/>
      ) 

    }
}
  
const MultipleCountries = ({ name, setFilterBy }) => {
    return(
      <div>
        {name} <button onClick={() => setFilterBy(name)}>show</button>
      </div>)
}

export default Result