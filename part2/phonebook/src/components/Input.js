import React from 'react'

const Input = (props) => {
    return(
        <div>
          {props.description} <input value = {props.value} onChange={props.onChange} required />
        </div>

    )
}

export default Input