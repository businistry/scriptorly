import React from 'react';
import TaskList from '../components/TaskList';

const HomePage = () => {
  return (
    <div className="home-page">
      <h1>DevOpsGPT Task Manager</h1>
      <TaskList />
    </div>
  );
};

export default HomePage;
