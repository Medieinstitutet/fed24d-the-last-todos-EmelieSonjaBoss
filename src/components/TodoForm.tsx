import { useState } from 'react';
import './TodoForm.scss';

// Props that this component accepts
interface TodoFormProps {
  onAdd: (title: string, description: string) => void;
}

// Component for adding new todos with title and description
export default function TodoForm({ onAdd }: TodoFormProps) {
  // State for form inputs
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return; // Don't add empty todos
    onAdd(title.trim(), description.trim());
    setTitle(''); // Clear inputs after adding
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <div>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Vad behöver göras?"
          className="todo-input"
        />
      </div>
      <div>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Lägg till en beskrivning (valfritt)"
          className="todo-input"
          rows={3}
        />
      </div>
      <button type="submit" className="todo-submit">
        Lägg till
      </button>
    </form>
  );
} 