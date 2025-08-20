import { TodoFilter } from "../cmps/TodoFilter.jsx"
import { TodoList } from "../cmps/TodoList.jsx"
import { DataTable } from "../cmps/data-table/DataTable.jsx"
import { loadTodos, removeTodo, saveTodo, setFilterBy } from '../store/actions/todo.actions.js'
import { todoService } from "../services/todo.service.js"

const { useEffect, useState } = React
const { Link, useSearchParams } = ReactRouterDOM
const { useSelector } = ReactRedux

export function TodoIndex() {
    // Use Redux store
    const todos = useSelector((storeState) => storeState.todos)
    const isLoading = useSelector(storeState => storeState.isLoading)
    const filterBy = useSelector(storeState => storeState.filterBy)

    // Special hook for accessing search-params:
    const [searchParams, setSearchParams] = useSearchParams()

    useEffect(() => {
        // Get initial filter from URL params
        const defaultFilter = todoService.getFilterFromSearchParams(searchParams)
        if (defaultFilter.txt !== filterBy.txt || defaultFilter.importance !== filterBy.importance) {
            setFilterBy(defaultFilter)
        }
    }, [])

    useEffect(() => {
        // Update URL when filter changes
        setSearchParams(filterBy)
    }, [filterBy])

    function onRemoveTodo(todoId) {
        removeTodo(todoId)
    }

    function onToggleTodo(todo) {
        const todoToSave = { ...todo, isDone: !todo.isDone }
        saveTodo(todoToSave)
    }

    function onSetFilterBy(newFilterBy) {
        setFilterBy(newFilterBy)
    }

    if (isLoading && !todos.length) return <div>Loading...</div>
    
    return (
        <section className="todo-index">
            <TodoFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
            <div>
                <Link to="/todo/edit" className="btn" >Add Todo</Link>
            </div>
            <h2>Todos List</h2>
            <TodoList todos={todos} onRemoveTodo={onRemoveTodo} onToggleTodo={onToggleTodo} />
            <hr />
            <h2>Todos Table</h2>
            <div style={{ width: '60%', margin: 'auto' }}>
                <DataTable todos={todos} onRemoveTodo={onRemoveTodo} />
            </div>
        </section>
    )
}