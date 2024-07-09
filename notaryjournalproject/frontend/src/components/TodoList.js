import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoItem from './TodoItem';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const fetchTodos = async () => {
      const res = await axios.get('/api/todos', {
        headers: { 'x-auth-token': localStorage.getItem('token') },
      });
      setTodos(res.data);
    };
    fetchTodos();
  }, []);

  const addTodo = async () => {
    const res = await axios.post(
      '/api/todos',
      { title, description },
      { headers: { 'x-auth-token': localStorage.getItem('token') } }
    );
    setTodos([...todos, res.data]);
    setTitle('');
    setDescription('');
  };

  const deleteTodo = async (id) => {
    await axios.delete(`/api/todos/${id}`, {
      headers: { 'x-auth-token': localStorage.getItem('token') },
    });
    setTodos(todos.filter((todo) => todo._id !== id));
  };

  const toggleTodo = async (id) => {
    const todo = todos.find((todo) => todo._id === id);
    const res = await axios.put(
      `/api/todos/${id}`,
      { completed: !todo.completed },
      { headers: { 'x-auth-token': localStorage.getItem('token') } }
    );
    setTodos(todos.map((todo) => (todo._id === id ? res.data : todo)));
  };

  const updateTodo = async (id, updatedTodo) => {
    const res = await axios.put(
      `/api/todos/${id}`,
      updatedTodo,
      { headers: { 'x-auth-token': localStorage.getItem('token') } }
    );
    setTodos(todos.map((todo) => (todo._id === id ? res.data : todo)));
  };

  return (
    <div className="todo-list">
      <h2>To-Do List</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={addTodo}>Add Todo</button>
      {todos.map((todo) => (
        <TodoItem
          key={todo._id}
          todo={todo}
          onDelete={deleteTodo}
          onToggle={toggleTodo}
          onUpdate={updateTodo}
        />
      ))}
    </div>
  );
};

export default TodoList;
