import React, { useState } from 'react'
import Phonebook from './components/Phonebook'
import PersonForm from './components/PersonForm'
import Input from './components/Input'


const App = () => {

  const [people, setPeople] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [filterName,setFilterName] = useState('')

const entriesToShow = people.filter(person => person.name.toUpperCase().includes(filterName.toUpperCase()))

const addPerson = (event)=>{
  event.preventDefault()
  const newEntry = {name: newName, number: newNumber}
  if(people.some((e)=>e.name === newName))
    alert(` '${newName}' has already been added to the phonebook.`)
  else
  setPeople(people.concat(newEntry))

  setNewName('')
  setNewNumber('')
}

const handleNameChange = (event) => {
  console.log(event.target.value)
  setNewName(event.target.value)
}
const handleNumberChange = (event) => {
  console.log(event.target.value)
  setNewNumber(event.target.value)
}
const handleFilterNameChange = (event) => {
  console.log(event.target.value)
  setFilterName(event.target.value)
}

  return (
    <div>
      <h2>Phonebook</h2>
      <PersonForm addPerson = {addPerson} newName = {newName} handleNameChange = {handleNameChange} newNumber = {newNumber} handleNumberChange = {handleNumberChange}/>
      <h2>Filter by name</h2>
      <Input description = 'Filter' value = {filterName} onChange = {handleFilterNameChange}/>
      <h2>Numbers</h2>
      <Phonebook people = {entriesToShow}/>
    </div>
  )
}

export default App