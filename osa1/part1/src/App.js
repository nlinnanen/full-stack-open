import React from 'react'

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Course course={course}/>
      <Parts parts= {parts}/>
      <Total parts={parts}/>
    </div>
  )}


    
  const Course = (props) => {
    return(<h1>{props.course}</h1>)  
  }

  const Part = (props) => {
    return(<p>{props.part.name} {props.part.exercises}</p>)
  }
  
      
  const Parts = (props) => {
    return(
      <>
        {props.parts.map(p => <Part part={p}/>)}
      </>
    )
  }

  const Total = (props) => {
    return(<p>Number of exercises {props.parts.map(p => p.exercises).reduce((a, c) => a+c)}</p>)
  }
  

export default App
