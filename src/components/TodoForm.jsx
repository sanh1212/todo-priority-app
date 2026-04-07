import { useState } from 'react'

export default function TodoForm({ onAdd }) {
  const [title, setTitle] = useState('')
  const [priority, setPriority] = useState('medium')
  const [error, setError] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (!title.trim()) {
      setError('Please enter a task title.')
      return
    }
    setError('')
    onAdd({ title: title.trim(), priority })
    setTitle('')
    setPriority('medium')
  }

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <h2>Add New Task</h2>
      <div className="form-row">
        <input
          type="text"
          placeholder="Task title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="todo-input"
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="todo-select"
        >
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <button type="submit" className="btn btn-add">
          Add
        </button>
      </div>
      {error && <p className="error-message">{error}</p>}
    </form>
  )
}
