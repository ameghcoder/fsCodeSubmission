/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */

const Header = (props) => {
    return (
      <h1>{props.course}</h1>
    )
  }
  // breaking Content part in Part Component
  const Part = (props) => {
    return (
      <p>{props.name} {props.exerciseCount}</p>
    )
  }
  const Content = (props) => {
    return(
      <>
        <Part name={props.parts[0].name} exerciseCount={props.parts[0].exercises} />
        <Part name={props.parts[1].name} exerciseCount={props.parts[1].exercises} />
        <Part name={props.parts[2].name} exerciseCount={props.parts[2].exercises} />
      </>
    )
  }
  const Total = (props) => {
    return(
      <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
    )
  }
  
  const CourseInfo = () => {
    const course = {
      name: "Half Stack application development",
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
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    )
  }
  
  export default CourseInfo