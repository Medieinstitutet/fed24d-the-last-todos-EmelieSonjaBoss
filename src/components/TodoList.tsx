import { useState, useEffect } from 'react';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';
import './TodoList.css';

// Defines the shape of our todo items
interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

// Main component that handles all todo functionality
export default function TodoList() {
  // State for todos - starts with hardcoded items
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [
      {
        id: 1,
        title: "Lära sig React",
        description: "Kolla igenom React-föreläsningarna",
        completed: false
      },
      {
        id: 2,
        title: "Gör en hard reset",
        description: "Ta mig tillbaka till versionen för todo-appen",
        completed: false
      },
      {
        id: 3,
        title: "Styla appen",
        description: "Lägg till CSS för att göra appen snygg",
        completed: false
      }
    ];
  });

  // State to toggle between showing active or completed todos
  const [showCompleted, setShowCompleted] = useState(false);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // Marks a todo as complete or incomplete
  const handleToggle = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  // Removes a todo from the list
  const handleDelete = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // Adds a new todo to the list
  const handleAdd = (title: string, description: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      title,
      description,
      completed: false
    };
    setTodos([...todos, newTodo]);
  };

  // Moves a todo up or down in the list
  const moveItem = (id: number, direction: 'up' | 'down') => {
    // Get current visible todos based on completed status
    const currentTodos = todos.filter(todo => 
      showCompleted ? todo.completed : !todo.completed
    );
    // Get the other todos that aren't currently visible
    const otherTodos = todos.filter(todo => 
      showCompleted ? !todo.completed : todo.completed
    );

    const index = currentTodos.findIndex(todo => todo.id === id);
    // Don't move if we're at the top/bottom of the list
    if (
      (direction === 'up' && index === 0) || 
      (direction === 'down' && index === currentTodos.length - 1)
    ) {
      return;
    }

    // Swap the todo with its neighbor
    const newTodos = [...currentTodos];
    const swapIndex = direction === 'up' ? index - 1 : index + 1;
    [newTodos[index], newTodos[swapIndex]] = [newTodos[swapIndex], newTodos[index]];

    // Update the full list, keeping invisible todos in their original position
    setTodos(showCompleted ? [...otherTodos, ...newTodos] : [...newTodos, ...otherTodos]);
  };

  // Get the todos that should be visible based on completed status
  const visibleTodos = todos.filter(todo => 
    showCompleted ? todo.completed : !todo.completed
  );

  // Count todos for the status display
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