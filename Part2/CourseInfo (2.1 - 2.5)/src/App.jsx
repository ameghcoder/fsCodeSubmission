/* eslint-disable react/prop-types */
import CourseInfo from "../Exercises/CourseInfo";

const App = () => {
  const courses = [
    {
      name: "Half Stack application development",
      id: 1,
      parts: [
        {
          name: "Fundamentals of React",
          exercises: 10,
          id: 1,
        },
        {
          name: "Using props to pass data",
          exercises: 7,
          id: 2,
        },
        {
          name: "State of a component",
          exercises: 14,
          id: 3,
        },
        {
          name: "Redux",
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: "Node.js",
      id: 2,
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 1,
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 2,
        },
      ],
    },
    {
      name: "Next.js",
      id: 3,
      parts: [
        {
          name: "App Routing",
          exercises: 3,
          id: 1,
        },
        {
          name: "NextAuth.js",
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];
  return (
    <>
      {courses.map((course) => (
        <CourseInfo key={course.id} course={course} />
      ))}
    </>
  );
};

export default App;
