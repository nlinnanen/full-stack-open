import React from 'react'

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
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
  }

  return (
    <div>
      <Course course={course.name}/>
      <Parts parts={course.parts}/>
      <Total parts={course.parts}/>
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
        {props.parts.map(p => <Part part={p} />)}
      </>
    )
  }

  const Total = (props) => {
    return(<p>Number of exercises {props.parts.map(p => p.exercises).reduce((a, c) => a+c)}</p>)
  }
  

export default App
