import React, { useEffect, useState } from 'react'
import WeatherInfo from './WeatherInfo'

const api_key = process.env.REACT_APP_API_KEY



const CountryInfo = ({ country }) => {
    return (
        <div>
            <h2>{country.name}</h2>
            <p>Captital:  {country.capital}</p>
            <p>Population: {country.population}</p>
            <img src={country.flag} width="500" height="400" alt={"Flag of " + country.name} />
            <h3>Languages</h3>
            <ul>
                {country.languages.map((l) => <li key={l.name}>{l.name}</li>)}
            </ul>
            <WeatherInfo countryName = {country.name}/>

        </div>)
}



const ShowCountries = ({ countries }) => {
    const numberOfCountries = countries.length
    const [showCountries, setShowCountries] = useState([])

    if (numberOfCountries > 10)
        return <p>{numberOfCountries} matches found. Please enter another filter</p>

    if(numberOfCountries === 0)
        return <p>No matching country was found</p>
        
    if (numberOfCountries === 1)
        return <CountryInfo country={countries[0]} />
    return (
        <ul>
            {countries.map((v, i) => {
                if (showCountries.includes(v.name))
                    return <li key={v.name}> <button onClick={() => setShowCountries(showCountries.filter((c) => c !== v.name))}> Hide</button><CountryInfo country={v} /></li>
                else
                    return <li key={v.name}>{v.name} <button onClick={() => setShowCountries(showCountries.concat(v.name))}>Show</button></li>

            })}

        </ul>)

}


export default ShowCountries