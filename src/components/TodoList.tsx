import TodoItem from './TodoItem';

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
    description: "Snabbkolla alltihop!",
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
  return (
    <div className="todo-list">
      <h1>To-do</h1>
      <ul>
        {INITIAL_TODOS.map(todo => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </div>
  );
} 