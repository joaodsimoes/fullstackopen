import React from 'react'

const Entry = ({entry}) => <li>{entry.name}: {entry.number}</li>

const Phonebook = ({people}) => {
  return(
    <ul>
      {people.map((person)=> <Entry key = {person.name} entry = {person}/>) }
    </ul>
  )
}

export default Phonebook