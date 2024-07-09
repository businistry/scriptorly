import React, { useState } from 'react';

const TodoItem = ({ todo, onDelete, onToggle, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);

  const handleUpdate = () => {
    onUpdate(todo._id, { title, description });
    setIsEditing(false);
  };

  return (
    <div className="todo-item">
      {isEditing ? (
        <>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button onClick={handleUpdate}>Save</button>
        </>
      ) : (
        <>
          <h3>
            {todo.title}{' '}
            <button onClick={() => onDelete(todo._id)}>Delete</button>
            <button onClick={() => setIsEditing(true)}>Edit</button>
          </h3>
          <p>{todo.description}</p>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggle(todo._id)}
          />
        </>
      )}
    </div>
  );
};

export default TodoItem;
