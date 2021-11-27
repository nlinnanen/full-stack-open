import React, { useState } from 'react'

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button name="good" handleClick={() => setGood(good + 1)} />
      <Button name="neutral" handleClick={() => setNeutral(neutral + 1)} />      
      <Button name="bad" handleClick={() => setBad(bad + 1)} />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}
const Button = ({ name, handleClick }) => <button onClick={handleClick}>{name}</button>


const Statistics = ({good, bad, neutral}) => {
  const stats = [good, bad, neutral]
  const sum = stats.reduce((a, e) => a+e)

  if(stats.every(a => a===0)) {

    return(<div>No feedback given</div>)

  } else {

    return(
      <table>
        <tbody>
          <tr>
            <td>good&nbsp;</td>
            <td>{good}</td>
          </tr>
          <tr>
            <td>neutral&nbsp;</td>
            <td>{neutral}</td>
          </tr>
          <tr>
            <td>bad&nbsp;</td>
            <td>{bad}</td>
          </tr>
          <tr>
            <td>all&nbsp;</td>
            <td>{sum}</td>
          </tr>
          <tr>
            <td>average&nbsp;</td>
            <td>{(good-bad)/sum}</td>
          </tr>
          <tr>
            <td>positive&nbsp;</td>
            <td>{(100*good/sum) + " %"}</td>
          </tr>
        </tbody>
      </table>
    )

  }
}



export default App
