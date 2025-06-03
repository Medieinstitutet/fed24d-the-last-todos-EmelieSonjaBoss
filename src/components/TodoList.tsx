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
  const [showCompleted, setShowCompleted] = useState(false);

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

  const moveItem = (id: number, direction: 'up' | 'down') => {
    const currentTodos = todos.filter(todo => 
      showCompleted ? todo.completed : !todo.completed
    );
    const otherTodos = todos.filter(todo => 
      showCompleted ? !todo.completed : todo.completed
    );

    const index = currentTodos.findIndex(todo => todo.id === id);
    if (
      (direction === 'up' && index === 0) || 
      (direction === 'down' && index === currentTodos.length - 1)
    ) {
      return; // Can't move further
    }

    const newTodos = [...currentTodos];
    const swapIndex = direction === 'up' ? index - 1 : index + 1;
    [newTodos[index], newTodos[swapIndex]] = [newTodos[swapIndex], newTodos[index]];

    setTodos(showCompleted ? [...otherTodos, ...newTodos] : [...newTodos, ...otherTodos]);
  };

  const visibleTodos = todos.filter(todo => 
    showCompleted ? todo.completed : !todo.completed
  );

  const activeTodosCount = todos.filter(todo => !todo.completed).length;
  const completedTodosCount = todos.filter(todo => todo.completed).length;

  return (
    <div className="todo-list">
      <h1>To-do</h1>
      <TodoForm onAdd={handleAdd} />
      
      <div className="todo-filters">
        <button 
          onClick={() => setShowCompleted(!showCompleted)}
          className="filter-button"
        >
          Visa {showCompleted ? 'aktiva' : 'avklarade'} uppgifter
        </button>
        <div className="todo-count">
          {showCompleted 
            ? `${completedTodosCount} avklarade uppgifter`
            : `${activeTodosCount} aktiva uppgifter`}
        </div>
      </div>

      <ul className="todo-list-items">
        {visibleTodos.map((todo, index) => (
          <li key={todo.id} className="todo-item-wrapper">
            <div className="sort-buttons">
              <button
                onClick={() => moveItem(todo.id, 'up')}
                disabled={index === 0}
                className="sort-button"
                title="Flytta upp"
              >
                ↑
              </button>
              <button
                onClick={() => moveItem(todo.id, 'down')}
                disabled={index === visibleTodos.length - 1}
                className="sort-button"
                title="Flytta ner"
              >
                ↓
              </button>
            </div>
            <TodoItem
              todo={todo}
              onToggle={handleToggle}
              onDelete={handleDelete}
            />
          </li>
        ))}
      </ul>
      
      {visibleTodos.length === 0 && (
        <p className="empty-message">
          {showCompleted 
            ? "Inga avklarade uppgifter än!"
            : "Inga aktiva uppgifter! Lägg till några uppgifter."}
        </p>
      )}
    </div>
  );
} 