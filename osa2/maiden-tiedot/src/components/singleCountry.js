import React from "react"
import Weather from "./weather"

const SingleCountry = ({ country }) => {
    return(
      <div>
        <h1>{country.name.common}</h1>
  
        <div>capital&nbsp;{country.capital[0]}</div>
        <div>population&nbsp;{country.population}</div>
  
        <h2>languages</h2>
        <ul>{Object.values(country.languages).map(lang => <li key={lang}>{lang}</li>)}</ul>
        
        <img src={country.flags.svg} alt={`flag of ${country.name.common}`} width="200px"/>

        <Weather city={country.capital}/>
      </div>
    )
}

export default SingleCountry