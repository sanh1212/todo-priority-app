import { useState } from 'react'
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'
import TodoStats from './components/TodoStats'
import {
  addTodo,
  toggleTodoStatus,
  filterTodos,
  sortTodosByPriority,
  getTodoStats,
} from './utils/todoUtils'
import './App.css'

let nextId = 1

export default function App() {
  const [todos, setTodos] = useState([])
  const [filter, setFilter] = useState('all')

  function handleAdd(todoData) {
    const newTodo = { id: nextId++, ...todoData }
    setTodos((prev) => addTodo(prev, newTodo))
  }

  function handleToggle(id) {
    setTodos((prev) => toggleTodoStatus(prev, id))
  }

  const filtered = filterTodos(todos, filter)
  const sorted = sortTodosByPriority(filtered)
  const stats = getTodoStats(todos)

  return (
    <div className="app-container">
      <h1 className="app-title">Todo Priority App</h1>
      <TodoStats stats={stats} />
      <TodoForm onAdd={handleAdd} />
      <div className="filter-box">
        {['all', 'completed', 'pending'].map((status) => (
          <button
            key={status}
            className={`btn btn-filter ${filter === status ? 'active' : ''}`}
            onClick={() => setFilter(status)}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>
      <TodoList todos={sorted} onToggle={handleToggle} />
    </div>
  )
}
