import { TodoFilter } from "../cmps/TodoFilter.jsx"
import { TodoList } from "../cmps/TodoList.jsx"
import { DataTable } from "../cmps/data-table/DataTable.jsx"
import { useStore } from "../services/useStore.js"
import { todoService } from "../services/todo.service.js"

const { useEffect } = React
const { Link, useSearchParams } = ReactRouterDOM

export function TodoIndex() {
    // Use the store instead of local state
    const { 
        todos, 
        isLoading, 
        filterBy, 
        loadTodos, 
        removeTodo, 
        toggleTodo, 
        setFilter 
    } = useStore()

    // Special hook for accessing search-params:
    const [searchParams, setSearchParams] = useSearchParams()

    useEffect(() => {
        // Get initial filter from URL params
        const defaultFilter = todoService.getFilterFromSearchParams(searchParams)
        if (defaultFilter.txt !== filterBy.txt || defaultFilter.importance !== filterBy.importance) {
            setFilter(defaultFilter)
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
        toggleTodo(todo)
    }

    function onSetFilterBy(newFilterBy) {
        setFilter(newFilterBy)
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