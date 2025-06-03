import { useState, useEffect } from 'react';
import './TodoItem.css';

// Shape of a todo item that this component will display
interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

// Props that this component accepts
interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

// Component that displays a single todo item with completion and delete functionality
export default function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  // State for handling fade animations
  const [isRemoving, setIsRemoving] = useState(false);
  const [isEntering, setIsEntering] = useState(true);

  // Start entrance animation when the component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsEntering(false);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  // Handle delete with fade-out animation
  const handleDelete = () => {
    setIsRemoving(true);
    setTimeout(() => {
      onDelete(todo.id);
    }, 200);
  };

  // Handle completion toggle with animation
  const handleToggle = () => {
    setIsRemoving(true);
    setTimeout(() => {
      onToggle(todo.id);
      setIsRemoving(false);
    }, 200);
  };

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''} ${isRemoving ? 'removing' : ''} ${isEntering ? 'entering' : ''}`}>
      <button onClick={handleToggle} className="todo-toggle">
        {todo.completed ? '✓' : '○'}
      </button>
      <div className="todo-content">
        <h3>{todo.title}</h3>
        <p>{todo.description}</p>
      </div>
      <button onClick={handleDelete} className="todo-delete">
        ×
      </button>
    </div>
  );
} 