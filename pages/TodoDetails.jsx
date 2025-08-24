import { todoService } from "../services/todo.service.js"

const { useState, useEffect } = React
const { useParams, useNavigate, Link } = ReactRouterDOM
const { useSelector } = ReactRedux

export function TodoDetails() {
    const navigate = useNavigate()
    const { todoId } = useParams()
    const todos = useSelector(storeState => storeState.todos.todos)
    const isLoading = useSelector(storeState => storeState.todos.isLoading)
    const todo = todos.find(todo => todo._id === todoId)

    useEffect(() => {
        if (!todo && !isLoading) {
            showErrorMsg('Todo not found')
            navigate('/todo')
        }
    }, [todo, isLoading])

    if (isLoading) return <div>Loading...</div>
    if (!todo) return <div>Todo not found</div>

    return (
        <section className="todo-details">
            <h1>Todo Details</h1>
            <div className="todo-info">
                <h2>{todo.txt}</h2>
                <p><strong>Importance:</strong> {todo.importance}</p>
                <p><strong>Status:</strong> {todo.isDone ? 'Completed' : 'Pending'}</p>
                <p><strong>Created:</strong> {new Date(todo.createdAt).toLocaleDateString()}</p>
                <p><strong>Last Updated:</strong> {new Date(todo.updatedAt).toLocaleDateString()}</p>
                {todo.color && <p><strong>Color:</strong> <span style={{ color: todo.color }}>■</span></p>}
            </div>
            <div className="todo-actions">
                <Link to={`/todo/edit/${todo._id}`} className="btn">Edit Todo</Link>
                <Link to="/todo" className="btn">Back to Todos</Link>
            </div>
        </section>
    )
}