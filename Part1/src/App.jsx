import { useState } from "react";
import CourseInfo from "../Exercises/CourseInfo";
import Unicafe from "../Exercises/Unicafe";
import Anecodates from "../Exercises/Anecodates";

const App = () => {

  const [firstBtn, setFirstBtn] = useState('none');
  const [secondBtn, setSecondBtn] = useState('none');
  const [thirdBtn, setThirdBtn] = useState('none');

  const setBtn = (_1, _2, _3) => {
    setFirstBtn(_1);
    setSecondBtn(_2);
    setThirdBtn(_3);
  }

  return (
    <>
      <div>
        <h2>Part 1 Has, Three Exercise (click to check)</h2>
        <div style={{display: 'flex', gap: 4}}>
          <button onClick={()=> setBtn('block', 'none', 'none')} style={{padding: '10px 5px', outline: 'none', background: 'skyblue'}} type='button'>Course Information</button>
          <button onClick={()=> setBtn('none', 'block', 'none')} style={{padding: '10px 5px', outline: 'none', background: 'skyblue'}} type='button'>Unicafe</button>
          <button onClick={()=> setBtn('none', 'none', 'block')} style={{padding: '10px 5px', outline: 'none', background: 'skyblue'}} type='button'>Anecdotes</button>
        </div>
        <hr />
        <div style={{display: firstBtn}}>
          <CourseInfo />
        </div>
        <div style={{display: secondBtn}}>
          <Unicafe />
        </div>
        <div style={{display: thirdBtn}}>
          <Anecodates />
        </div>
      </div>
    </>
  )
}

export default App;