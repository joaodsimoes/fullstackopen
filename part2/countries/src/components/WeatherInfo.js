import React, { useState, useEffect } from 'react'
import axios from 'axios'
const api_key = process.env.REACT_APP_API_KEY
const weatherUrl = "http://api.weatherstack.com/current?access_key=" + api_key + "&query="
const emptyRequest = {
    location: {
        localtime: "",
    },
    current: {
        temperature: "",
        weather_icons: [""]
    }
}

const WeatherInfo = ({ countryName }) => {
    const [weather, setWeather] = useState(emptyRequest)
    useEffect(() => {
        console.log('effect')
        axios
            .get(weatherUrl + countryName)
            .then(response => {
                console.log('promise fulfilled')
                setWeather(response.data)
            })
    }, [])
    return (
        <div>
            <h3>Weather</h3>
            <p>Local time: {weather.location.localtime}</p>
            <img src={weather.current.weather_icons[0]}></img>
            <p>Current Temperature: {weather.current.temperature}</p>
        </div>
    )
}
export default WeatherInfo;