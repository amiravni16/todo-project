import { TodoFilter } from "../cmps/TodoFilter.jsx"
import { TodoList } from "../cmps/TodoList.jsx"
import { DataTable } from "../cmps/data-table/DataTable.jsx"
import { TodoSorting } from "../cmps/TodoSorting.jsx"
import { loadTodos, removeTodo, saveTodo, setFilterBy } from '../store/actions/todo.actions.js'
import { todoService } from "../services/todo.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"

const { useEffect, useState } = React
const { Link, useSearchParams } = ReactRouterDOM
const { useSelector, useDispatch } = ReactRedux

export function TodoIndex() {
    // Use Redux store
    const todos = useSelector((storeState) => storeState.todos)
    const isLoading = useSelector(storeState => storeState.isLoading)
    const filterBy = useSelector(storeState => storeState.filterBy)
    const dispatch = useDispatch()

    // Local state for sorting and paging
    const [sortBy, setSortBy] = useState({ field: 'createdAt', direction: 'desc' })
    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)

    // Special hook for accessing search-params:
    const [searchParams, setSearchParams] = useSearchParams()

    useEffect(() => {
        // Get initial filter from URL params
        const defaultFilter = todoService.getFilterFromSearchParams(searchParams)
        if (defaultFilter.txt !== filterBy.txt || defaultFilter.importance !== filterBy.importance || defaultFilter.isDone !== filterBy.isDone) {
            dispatch(setFilterBy(defaultFilter))
        }
    }, [])

    useEffect(() => {
        // Update URL when filter changes
        setSearchParams(filterBy)
    }, [filterBy])

    useEffect(() => {
        // Load todos when filter changes
        dispatch(loadTodos(filterBy))
    }, [filterBy])

    // Reset to first page when filter changes
    useEffect(() => {
        setCurrentPage(1)
    }, [filterBy])

    function onRemoveTodo(todoId) {
        const ans = confirm('Do you want to delete this todo?')
        if (!ans) return
        dispatch(removeTodo(todoId))
            .then(() => {
                console.log('removed todo ' + todoId);
                showSuccessMsg(`Removed todo with ${todoId} id successfully`)
            })
            .catch(() => showErrorMsg('Had trouble removing the todo'))
    }

    function onToggleTodo(todo) {
        const todoToSave = { ...todo, isDone: !todo.isDone }
        dispatch(saveTodo(todoToSave))
            .then(() => {
                showSuccessMsg(`Updated ${todoToSave.txt} successfully`)
            })
            .catch(() => showErrorMsg('Had trouble updating the todo'))
    }

    function onSetFilterBy(newFilterBy) {
        dispatch(setFilterBy(newFilterBy))
    }

    function onSortChange(newSortBy) {
        setSortBy(newSortBy)
        setCurrentPage(1) // Reset to first page when sorting changes
    }

    function onPageChange(newPage) {
        setCurrentPage(newPage)
    }

    // Apply sorting and paging to todos
    const sortedAndPaginatedTodos = todos ? todoService.getTodosWithSortingAndPaging(todos, {
        sortBy,
        page: currentPage,
        pageSize
    }) : { todos: [], pagination: { currentPage: 1, totalPages: 1, totalItems: 0 } }

    const { todos: displayTodos, pagination } = sortedAndPaginatedTodos

    return (
        <section className="todo-index">
            <TodoFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
            <TodoSorting 
                onSortChange={onSortChange}
                onPageChange={onPageChange}
                onPageSizeChange={setPageSize}
                currentSort={sortBy}
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                totalItems={pagination.totalItems}
                pageSize={pageSize}
            />
            <div>
                <Link to="/todo/edit" className="btn" >Add Todo</Link>
            </div>
            <h2>Todos List</h2>
            {isLoading
                ? <h1 className="loader">Loading...</h1>
                : <TodoList todos={displayTodos} onRemoveTodo={onRemoveTodo} onToggleTodo={onToggleTodo} />
            }
            <hr />
            <h2>Todos Table</h2>
            <div style={{ width: '60%', margin: 'auto' }}>
                <DataTable todos={displayTodos} onRemoveTodo={onRemoveTodo} />
            </div>
        </section>
    )
}