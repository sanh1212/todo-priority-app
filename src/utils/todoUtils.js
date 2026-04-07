const VALID_PRIORITIES = ['high', 'medium', 'low']

export function validateTodo(todo) {
  if (!todo || typeof todo !== 'object') {
    throw new Error('Todo must be an object')
  }
  if (!todo.title || todo.title.trim() === '') {
    throw new Error('Title cannot be empty')
  }
  if (!VALID_PRIORITIES.includes(todo.priority)) {
    throw new Error('Priority must be high, medium, or low')
  }
}

export function addTodo(list, todo) {
  validateTodo(todo)
  return [...list, { ...todo, completed: false }]
}

export function toggleTodoStatus(list, id) {
  return list.map((todo) =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  )
}

export function filterTodos(list, status) {
  if (status === 'completed') return list.filter((todo) => todo.completed)
  if (status === 'pending') return list.filter((todo) => !todo.completed)
  return list
}

const PRIORITY_ORDER = { high: 0, medium: 1, low: 2 }

export function sortTodosByPriority(list) {
  return [...list].sort(
    (a, b) => PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority]
  )
}

export function getTodoStats(list) {
  const completed = list.filter((todo) => todo.completed).length
  return {
    total: list.length,
    completed,
    pending: list.length - completed,
  }
}
