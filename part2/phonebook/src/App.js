import React, { useState, useEffect } from 'react'
import Entry from './components/PhonebookEntry'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'
import Input from './components/Input'
import personService from './services/persons'




const App = () => {

  const [people, setPeople] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [isError, setIsError] = useState(false)


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
    const user = people.find((person) => person.name === newName)

    if (user !== undefined) {
      const result = window.confirm(`${newName} has already been added to the phonebook, replace old number with new one?`)
      if (result) {
        personService
          .update(user.id, newEntry)
          .then(responseData =>{ 
          setPeople(people.map(p => p.id !== user.id ? p : responseData))
          showErrorMessage(`${user.name}'s info was successfully updated.`,false)
        }).catch((error) =>{
          console.log(error.response)
          console.log(error.response.status);
          if(error.response.status === 404)
            setPeople(people.filter((p) => p.id !== user.id))

          showErrorMessage(error.response.data,true) 

        })
      }
    } else {
      personService
        .create(newEntry)
        .then(person =>{ 
        setPeople(people.concat(person))
        showErrorMessage(`${person.name} was successfully added to the phonebook.`,false)  
        }).catch(error => showErrorMessage(error.response.data,true)  )

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
        .then(response =>{ 
          setPeople(people.filter((p) => p.id !== id))
          showErrorMessage(`${person.name} was deleted.`,false)
        })
        .catch(error =>{
          setPeople(people.filter((p) => p.id !== id))
          showErrorMessage(error.response.data,true) 
        })
    }
  }


  const showErrorMessage = (message,isError) => {
    setIsError(isError)
    setErrorMessage(message)
   
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
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
      <Notification message = {errorMessage} error = {isError}/>
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