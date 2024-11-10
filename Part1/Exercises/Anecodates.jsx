import { useState } from "react"

const Anecodates = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ];

  let [selected, setSelected] = useState(0);
  let [vote, setVote] = useState(Array(anecdotes.length).fill(0));

  const changeQuote = () => {
    const randNum = Math.round(Math.random() * (anecdotes.length - 1));
    setSelected(randNum);
  }
  const voteThis = () => {
    setVote(
      vote.map((value, index)=> index == selected ? value + 1 : value)
    );
  }
  return (
  <div>
    <h2>Anecdotes for Software Engineeries</h2>
    <button onClick={() => voteThis()}>Vote</button>
    <button onClick={() => changeQuote()}>Change Quote</button>
    <p>Vote: {vote[selected]}</p>
    <p>
      {anecdotes[selected]}
    </p>
    <h2>Anecdote with most votes</h2>
    <p>
      {
        anecdotes[vote.indexOf(Math.max(...vote))]
      }
    </p>
  </div>
  )
}

export default Anecodates