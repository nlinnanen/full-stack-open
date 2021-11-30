const Course = ({ course }) => {
    return(
        <div>
            <h1>{course.name}</h1>
            <Parts parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )  
  }

const Part = (props) =>
    <p>{props.part.name} {props.part.exercises}</p>

    
const Parts = ({ parts }) => 
    <>{parts.map(p => <Part part={p} key={p.id}/>)}</>

const Total = ({ parts }) => 
    <p><b>total of {parts.map(p => p.exercises).reduce((a, c) => a+c)} exercises</b></p>

export default Course