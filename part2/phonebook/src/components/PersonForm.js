import React from 'react'
import Input from './Input'

const PersonForm = (props) => {
    return(
      <form onSubmit={props.addPerson} >
        <Input description = 'name' value = {props.newName} onChange = {props.handleNameChange}/>
        <Input description = 'number' value = {props.newNumber} onChange = {props.handleNumberChange} />
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
    )
}
export default PersonForm