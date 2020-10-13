import React from 'react'

let style = {
    color: "red",
    background: "lightgrey",
    fontSize: "20px",
    borderStyle: "solid",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
  }

const Notification = ({ message,error}) => {
    if (message === null) {
      return null
    }
    if(error)
        style = {...style, color: "red"}
    else
    style = {...style, color: "green"}
        
    return (
      <div style = {style} className="notification">
        {message}
      </div>
    )
  }

 export default Notification 