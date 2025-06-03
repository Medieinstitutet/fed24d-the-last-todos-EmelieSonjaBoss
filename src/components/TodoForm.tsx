import { useState } from 'react';

interface TodoFormProps {
  onAdd: (title: string, description: string) => void;
}

export default function TodoForm({ onAdd }: TodoFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd(title.trim(), description.trim());
    setTitle('');
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