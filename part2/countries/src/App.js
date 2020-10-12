import React, {useState, useEffect } from 'react';
import axios from 'axios'
import ShowCountries from './components/ShowCountries'

function App() {
  const [countries,setCountries] = useState([])
  const [filter,setFilter] =  useState('')

  const hook = () => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }
  useEffect(hook, [])

  const countriesToShow = countries.filter((v)=> v.name.toUpperCase().includes(filter.toUpperCase()))

  return (
    <div>
      Find Countries: <input value = {filter} onChange = {(e) => setFilter(e.target.value)}/>
      <ShowCountries countries = {countriesToShow} />
    </div>
  );
}

export default App;
