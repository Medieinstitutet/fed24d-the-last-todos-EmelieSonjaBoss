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
  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <button onClick={() => onToggle(todo.id)} className="todo-toggle">
        {todo.completed ? '✓' : '○'}
      </button>
      <div className="todo-content">
        <h3>{todo.title}</h3>
        <p>{todo.description}</p>
      </div>
      <button onClick={() => onDelete(todo.id)} className="todo-delete">
        ×
      </button>
    </li>
  );
} 