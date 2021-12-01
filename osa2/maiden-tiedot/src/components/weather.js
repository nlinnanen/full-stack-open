import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ city }) => {
    const api_key = process.env.REACT_APP_API_KEY

    const [ weather, setWeather ] = useState([])
  
    useEffect(() => {
      axios
        .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${city}`)
        .then(response => {
            setWeather(response.data.current)
        })
    }, [api_key, city])

    return(
        <div>
            <h2>Weather in {city}</h2>
            <div><b>temperature</b> {weather.temperature} celsius</div>
            <img src={weather.weather_icons} alt={weather.weather_descriptions}/>
            <div><b>wind</b> {weather.wind_speed} mph direction {weather.wind_dir}</div>
        </div>
    )
    
  
}

export default Weather