import { useState, useEffect } from 'react';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';

interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

const INITIAL_TODOS: Todo[] = [
  {
    id: 1,
    title: "Kolla på missade föreläsningar",
    description: "Snabkolla alltihop!",
    completed: false
  },
  {
    id: 2,
    title: "Gör klart todo-uppgiften",
    description: "G-krav och frivilliga VG-krav",
    completed: false
  },
  {
    id: 3,
    title: "Uppdatera Portfolio med nytt mini-projekt",
    description: "Kanske lägg till något mer kul?",
    completed: false
  }
];

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>(() => {
  
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : INITIAL_TODOS;
  });


  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleToggle = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const handleDelete = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleAdd = (title: string, description: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      title,
      description,
      completed: false
    };
    setTodos([...todos, newTodo]);
  };

  return (
    <div className="todo-list">
      <h1>To-do</h1>
      <TodoForm onAdd={handleAdd} />
      <ul>
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={handleToggle}
            onDelete={handleDelete}
          />
        ))}
      </ul>
      {todos.length === 0 && (
        <p className="empty-message">Inga todos än! Lägg till några uppgifter.</p>
      )}
    </div>
  );
} 