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
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const HomePage = () => {
  const [projects, setProjects] = useState([]);
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectDescription, setNewProjectDescription] = useState('');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const response = await axios.get('http://localhost:5000/api/projects');
    setProjects(response.data);
  };

  const createProject = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/projects', {
      name: newProjectName,
      description: newProjectDescription
    });
    setNewProjectName('');
    setNewProjectDescription('');
    fetchProjects();
  };

  return (
    <div className="home-page">
      <h1>AutoDevOps Dashboard</h1>
      <form onSubmit={createProject}>
        <input
          type="text"
          value={newProjectName}
          onChange={(e) => setNewProjectName(e.target.value)}
          placeholder="Project name"
          required
        />
        <input
          type="text"
          value={newProjectDescription}
          onChange={(e) => setNewProjectDescription(e.target.value)}
          placeholder="Project description"
          required
        />
        <button type="submit">Create Project</button>
      </form>
      <h2>Projects</h2>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            <Link to={`/project/${project.id}`}>{project.name}</Link>
            <p>{project.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
