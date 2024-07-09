import React from 'react';
import TodoList from '../components/TodoList';

const HomePage = () => {
  return (
    <div className="home-page">
      <h1>Hotel Manager's To-Do List</h1>
      <TodoList />
    </div>
  );
};

export default HomePage;
