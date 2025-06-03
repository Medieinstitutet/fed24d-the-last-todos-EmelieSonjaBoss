interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

interface TodoItemProps {
  todo: Todo;
}

export default function TodoItem({ todo }: TodoItemProps) {
  return (
    <li className="todo-item">
      <h3>{todo.title}</h3>
      <p>{todo.description}</p>
    </li>
  );
} 