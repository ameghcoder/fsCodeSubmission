/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */

// Header Component
const Header = (props) => <h1>{props.course}</h1>;
   
// Part Component
const Part = (props) => <p>{props.name} - {props.exerciseCount}</p>

// Content Component
const Content = ({ parts }) => {
  return(
    <>
      { 
        parts.map(value => 
          <Part key={value.id} name={value.name} exerciseCount={value.exercises} />
        ) 
      }
    </>
  )
};

// Total Count Component
const Total = ({ parts }) => {
  return(
    <>
      <strong>Total Number of exercises - { 
          parts.reduce((s, i) => {
            return s += i.exercises
          }, 0)
        }
      </strong>
    </>
  )
}

// Main Component
const CourseInfo = ({ course }) => {
  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  )
}

export default CourseInfo;