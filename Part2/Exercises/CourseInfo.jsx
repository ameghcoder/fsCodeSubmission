/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */

// Course Info component
const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}
// breaking Content part in Part Component
const Part = (props) => {
  return (
    <p>{props.name} - {props.exerciseCount}</p>
  )
}
const Content = ({ parts }) => {
  return(
    <>
      {
        parts.map((value) => <Part key={value.id} name={value.name} exerciseCount={value.exercises} />)
      }
    </>
  )
}
const Total = ({ parts }) => {
  return(
    <>
      <p>Total Number of exercises - { 
          parts.reduce((s, i) => {
            return s += i.exercises
          }, 0)
        }
      </p>
    </>
  )
}

const CourseInfo = ({ course }) => {
  console.log(course);
  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  )
}

export default CourseInfo;