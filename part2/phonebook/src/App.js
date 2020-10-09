import React, { useState } from 'react'
import Phonebook from './components/Phonebook'


const App = () => {

const [ people, setPeople ] = useState([
    { name: 'Arto Hellas',
      number: '872-123-543' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

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

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson} >
        <div>
          name: <input value = {newName} onChange={handleNameChange} />
        </div>
        <div>
        number: <input value = {newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Phonebook people = {people}/>
    </div>
  )
}

export default App