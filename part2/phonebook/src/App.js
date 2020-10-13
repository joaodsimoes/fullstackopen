import React, { useState, useEffect } from 'react'
import Entry from './components/PhonebookEntry'
import PersonForm from './components/PersonForm'
import Input from './components/Input'
import personService from './services/persons'

const App = () => {

  const [people, setPeople] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')

  useEffect(() => {
    console.log("Requesting persons in phonebook...");
    personService
      .getAll()
      .then(people => {
        console.log('Promise fulfilled', people)
        setPeople(people)
      })
  }, [])


  const entriesToShow = people.filter(person => person.name.toUpperCase().includes(filterName.toUpperCase()))

  const addPerson = (event) => {
    event.preventDefault()
    const newEntry = { name: newName, number: newNumber }
    const userExists = people.filter((person) => person.name === newName)

    if (userExists.length > 0) {
      const person = userExists[0]
      const result = window.confirm(`${newName} has already been added to the phonebook, replace old number with new one?`)
      if (result) {
        personService
          .update(person.id, newEntry)
          .then(responseData => setPeople(people.map(p => p.id !== person.id ? p : responseData)))
      }
    } else {
      personService
        .create(newEntry)
        .then(person => setPeople(people.concat(person)))

    }
    setNewName('')
    setNewNumber('')
  }

  const deletePerson = (person) => {

    const message = `Delete ${person.name}?`
    const result = window.confirm(message);
    if (result) {
      const id = person.id
      personService
        .deletePerson(id)
        .then(response => setPeople(people.filter((person) => person.id !== id)))
        .catch(error => console.log('Error eliminating person'))
    }
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
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Filter by name</h2>
      <Input description='Filter' value={filterName} onChange={handleFilterNameChange} />
      <h2>Numbers</h2>
      <ul>
        {entriesToShow.map((person) => <Entry key={person.id} entry={person} onClick={() => deletePerson(person)} />)}
      </ul>

    </div>
  )
}

export default App