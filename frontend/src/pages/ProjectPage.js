import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProjectPage = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [requirements, setRequirements] = useState([]);
  const [newRequirement, setNewRequirement] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');

  useEffect(() => {
    fetchProject();
    fetchRequirements();
  }, [id]);

  const fetchProject = async () => {
    const response = await axios.get(`http://localhost:5000/api/projects/${id}`);
    setProject(response.data);
  };

  const fetchRequirements = async () => {
    const response = await axios.get(`http://localhost:5000/api/requirements/${id}`);
    setRequirements(response.data);
  };

  const createRequirement = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/requirements', {
      project_id: id,
      description: newRequirement
    });
    setNewRequirement('');
    fetchRequirements();
  };

  const generateCode = async (requirementId) => {
    const response = await axios.post('http://localhost:5000/api/code-generation', {
      requirement_id: requirementId
    });
    setGeneratedCode(response.data.generated_code);
  };

  if (!project) return <div>Loading...</div>;

  return (
    <div className="project-page">
      <h1>{project.name}</h1>
      <p>{project.description}</p>
      <h2>Requirements</h2>
      <form onSubmit={createRequirement}>
        <input
          type="text"
          value={newRequirement}
          onChange={(e) => setNewRequirement(e.target.value)}
          placeholder="New requirement"
          required
        />
        <button type="submit">Add Requirement</button>
      </form>
      <ul>
        {requirements.map((req) => (
          <li key={req.id}>
            {req.description}
            <button onClick={() => generateCode(req.id)}>Generate Code</button>
          </li>
        ))}
      </ul>
      {generatedCode && (
        <div>
          <h3>Generated Code</h3>
          <pre>{generatedCode}</pre>
        </div>
      )}
    </div>
  );
};

export default ProjectPage;
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProjectPage = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [requirements, setRequirements] = useState([]);
  const [newRequirement, setNewRequirement] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');

  useEffect(() => {
    fetchProject();
    fetchRequirements();
  }, [id]);

  const fetchProject = async () => {
    const response = await axios.get(`http://localhost:5000/api/projects/${id}`);
    setProject(response.data);
  };

  const fetchRequirements = async () => {
    const response = await axios.get(`http://localhost:5000/api/requirements/${id}`);
    setRequirements(response.data);
  };

  const createRequirement = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/requirements', {
      project_id: id,
      description: newRequirement
    });
    setNewRequirement('');
    fetchRequirements();
  };

  const generateCode = async (requirementId) => {
    const response = await axios.post('http://localhost:5000/api/code-generation', {
      requirement_id: requirementId
    });
    setGeneratedCode(response.data.generated_code);
  };

  if (!project) return <div>Loading...</div>;

  return (
    <div className="project-page">
      <h1>{project.name}</h1>
      <p>{project.description}</p>
      <h2>Requirements</h2>
      <form onSubmit={createRequirement}>
        <input
          type="text"
          value={newRequirement}
          onChange={(e) => setNewRequirement(e.target.value)}
          placeholder="New requirement"
          required
        />
        <button type="submit">Add Requirement</button>
      </form>
      <ul>
        {requirements.map((req) => (
          <li key={req.id}>
            {req.description}
            <button onClick={() => generateCode(req.id)}>Generate Code</button>
          </li>
        ))}
      </ul>
      {generatedCode && (
        <div>
          <h3>Generated Code</h3>
          <pre>{generatedCode}</pre>
        </div>
      )}
    </div>
  );
};

export default ProjectPage;
