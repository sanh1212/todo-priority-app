import { describe, it, expect } from 'vitest'
import {
  validateTodo,
  addTodo,
  toggleTodoStatus,
  filterTodos,
  sortTodosByPriority,
  getTodoStats,
} from '../src/utils/todoUtils'

describe('validateTodo', () => {
  it('accepts a valid todo', () => {
    expect(() =>
      validateTodo({ title: 'Buy milk', priority: 'high' })
    ).not.toThrow()
  })

  it('accepts all valid priorities', () => {
    expect(() =>
      validateTodo({ title: 'Task', priority: 'medium' })
    ).not.toThrow()
    expect(() =>
      validateTodo({ title: 'Task', priority: 'low' })
    ).not.toThrow()
  })

  it('throws when todo is not an object', () => {
    expect(() => validateTodo(null)).toThrow()
    expect(() => validateTodo('string')).toThrow()
  })

  it('throws when title is empty', () => {
    expect(() =>
      validateTodo({ title: '', priority: 'high' })
    ).toThrow('Title cannot be empty')
  })

  it('throws when title is whitespace only', () => {
    expect(() =>
      validateTodo({ title: '   ', priority: 'high' })
    ).toThrow('Title cannot be empty')
  })

  it('throws when priority is invalid', () => {
    expect(() =>
      validateTodo({ title: 'Task', priority: 'urgent' })
    ).toThrow('Priority must be high, medium, or low')
  })
})

describe('addTodo', () => {
  it('adds a new todo to the list', () => {
    const result = addTodo([], { id: 1, title: 'Buy milk', priority: 'high' })
    expect(result).toHaveLength(1)
    expect(result[0].title).toBe('Buy milk')
    expect(result[0].completed).toBe(false)
  })

  it('does not mutate the original list', () => {
    const original = []
    const result = addTodo(original, { id: 1, title: 'Task', priority: 'low' })
    expect(original).toHaveLength(0)
    expect(result).toHaveLength(1)
  })

  it('throws when todo is invalid', () => {
    expect(() => addTodo([], { title: '', priority: 'high' })).toThrow()
  })
})

describe('toggleTodoStatus', () => {
  const todos = [
    { id: 1, title: 'Task 1', priority: 'high', completed: false },
    { id: 2, title: 'Task 2', priority: 'low', completed: true },
  ]

  it('toggles completed from false to true', () => {
    const result = toggleTodoStatus(todos, 1)
    expect(result[0].completed).toBe(true)
  })

  it('toggles completed from true to false', () => {
    const result = toggleTodoStatus(todos, 2)
    expect(result[1].completed).toBe(false)
  })

  it('does not mutate the original list', () => {
    toggleTodoStatus(todos, 1)
    expect(todos[0].completed).toBe(false)
  })

  it('leaves other todos unchanged', () => {
    const result = toggleTodoStatus(todos, 1)
    expect(result[1]).toEqual(todos[1])
  })
})

describe('filterTodos', () => {
  const todos = [
    { id: 1, title: 'Task 1', completed: false },
    { id: 2, title: 'Task 2', completed: true },
    { id: 3, title: 'Task 3', completed: false },
  ]

  it('returns all todos when status is "all"', () => {
    expect(filterTodos(todos, 'all')).toHaveLength(3)
  })

  it('returns only completed todos', () => {
    const result = filterTodos(todos, 'completed')
    expect(result).toHaveLength(1)
    expect(result[0].id).toBe(2)
  })

  it('returns only pending todos', () => {
    const result = filterTodos(todos, 'pending')
    expect(result).toHaveLength(2)
    result.forEach((t) => expect(t.completed).toBe(false))
  })
})

describe('sortTodosByPriority', () => {
  it('sorts high > medium > low', () => {
    const todos = [
      { id: 1, priority: 'low' },
      { id: 2, priority: 'high' },
      { id: 3, priority: 'medium' },
    ]
    const result = sortTodosByPriority(todos)
    expect(result[0].priority).toBe('high')
    expect(result[1].priority).toBe('medium')
    expect(result[2].priority).toBe('low')
  })

  it('does not mutate the original list', () => {
    const todos = [
      { id: 1, priority: 'low' },
      { id: 2, priority: 'high' },
    ]
    sortTodosByPriority(todos)
    expect(todos[0].priority).toBe('low')
  })
})

describe('getTodoStats', () => {
  it('returns correct stats', () => {
    const todos = [
      { id: 1, completed: true },
      { id: 2, completed: false },
      { id: 3, completed: true },
    ]
    const stats = getTodoStats(todos)
    expect(stats.total).toBe(3)
    expect(stats.completed).toBe(2)
    expect(stats.pending).toBe(1)
  })

  it('returns zero stats for empty list', () => {
    const stats = getTodoStats([])
    expect(stats).toEqual({ total: 0, completed: 0, pending: 0 })
  })
})
