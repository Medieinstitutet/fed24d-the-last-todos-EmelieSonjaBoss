import { useState, useEffect } from 'react';

interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  const [isRemoving, setIsRemoving] = useState(false);
  const [isEntering, setIsEntering] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsEntering(false);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  const handleDelete = () => {
    setIsRemoving(true);
    setTimeout(() => {
      onDelete(todo.id);
    }, 200);
  };

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