import { useState } from "react"

const Statistics = ({good, neutral, bad}) => {
  if(good == 0 && neutral == 0 && bad == 0){
    return (
      <>
        <p>No feedback given</p>
      </>
    )
  }
  return(
    <>
      <table>
        <tr>
          <td>Good:</td>
          <td>{good}</td>
        </tr>
        <tr>
          <td>Neutral:</td>
          <td>{neutral}</td>
        </tr>
        <tr>
          <td>Bad:</td>
          <td>{bad}</td>
        </tr>
        <tr>
          <td>Total Feedback count:</td>
          <td>{good + neutral + bad}</td>
        </tr>
        <tr>
          <td>Average:</td>
          <td>{(good + neutral + bad) / 3}</td>
        </tr>
        <tr>
          <td>Positive:</td>
          <td>{(100 * good) / (good + neutral + bad)}%</td>
        </tr>
      </table>
    </>
  )
}

const Unicafe = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
  <div>
      <h1>Give Your Feedback</h1>
      <button onClick={() => setGood(good + 1)}>good</button>
      <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
      <button onClick={() => setBad(bad + 1)}>bad</button>
      <h2>Statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} />
  </div>
  )
}

export default Unicafe