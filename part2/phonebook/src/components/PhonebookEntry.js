import React from 'react'

const Entry = ({entry,onClick}) => <li>{entry.name}: {entry.number} <button onClick = {onClick}>Delete</button> </li>


export default Entry