
import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setPoint] = useState([0, 0, 0, 0, 0, 0, 0])

  const changeAnecdotes = () => {
    let rnd = Math.floor(Math.random()*anecdotes.length)
    console.log(rnd)
    setSelected(rnd)
  }

  const vote = () => {
    const newPoint = [...points]
    newPoint[selected] += 1
    setPoint(newPoint)
  }
  console.log("points -> ", points)

  let maxVote = Math.max(...points);
  let popular = points.findIndex(e => e === maxVote)
  console.log("max vote: ", maxVote, "  popular: ", popular)

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <p>Has {points[selected]} {(points[selected] < 2)? "vote":"votes"}</p>
      <button onClick={vote} >Vote</button>
      <button onClick={changeAnecdotes} >Next anecdote</button>
      <h1>Anecdote with most votes</h1>
      {anecdotes[popular]}
      <p>Has {points[popular]} {(points[popular] < 2)? "vote":"votes"}</p>
    </div>
  )
}

export default App;
