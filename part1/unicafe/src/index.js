import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({text}) => <div><h1>{text}</h1></div>

const DisplayStatistics = (props) => {
  if(!props.total)
    return (<div>Not enough feedback</div>)

  return(
    <>
    <table>
      <tbody>
        <Statistic text = "Good: " value = {props.good}/>
        <Statistic text = "Neutral: " value = {props.neutral}/>
        <Statistic text = "Bad: " value = {props.bad}/>
        <Statistic text = "All: " value = {props.total}/>
        <Statistic text = "Average: " value = {props.average}/>
        <Statistic text = "Positive: " value = {props.positive}/>
      </tbody>
    </table>
    </>
  )
}

const Statistic = ({ text,value }) => {
  return (
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr> 
  )
}

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const App = (props) => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const getTotal = () => good+neutral+bad
  const getPositive = () => (good/getTotal())*100 +"%"
  const getAverage = () => ((good-bad)/getTotal())

  return (
    <div>
      <div>
        <Header text= "Give feedback"/>
        <Button onClick={() => setGood(good + 1)} text='Good' />
        <Button onClick={() => setNeutral(neutral + 1)} text='Neutral' />
        <Button onClick={() => setBad(bad + 1)} text='Bad' />
        <Header text= "Statistics"/>
        <DisplayStatistics good = {good} neutral = {neutral} bad = {bad} total = {getTotal()} positive = {getPositive()} average = {getAverage()}/>
      </div>
    </div>
  )
}

ReactDOM.render(
  <App />, 
  document.getElementById('root')
)