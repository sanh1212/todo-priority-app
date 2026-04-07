export default function TodoList({ todos, onToggle }) {
  if (todos.length === 0) {
    return <p className="empty-message">No tasks found.</p>
  }

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <li key={todo.id} className={`todo-item priority-${todo.priority}`}>
          <div className="todo-info">
            <span className={`todo-title ${todo.completed ? 'completed' : ''}`}>
              {todo.title}
            </span>
            <span className={`priority-badge priority-${todo.priority}`}>
              {todo.priority}
            </span>
          </div>
          <button
            className={`btn ${todo.completed ? 'btn-undo' : 'btn-complete'}`}
            onClick={() => onToggle(todo.id)}
          >
            {todo.completed ? 'Undo' : 'Complete'}
          </button>
        </li>
      ))}
    </ul>
  )
}
