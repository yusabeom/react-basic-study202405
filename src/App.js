import './App.css';
import React from 'react';
import CourseInput from './components/CourseGoals/CourseInput';
import CourseList from './components/CourseGoals/CourseList';

function App() {
  return (
    <div>
      <section id="goal-form">
        <CourseInput />
      </section>
      <section id="goals">
        <CourseList />
      </section>
    </div>
  );
}

export default App;
