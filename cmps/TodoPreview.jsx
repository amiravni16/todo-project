export function TodoPreview({ todo, onToggleTodo }) {
    return (
        <article className="todo-preview" style={{ borderLeft: `5px solid ${todo.color}` }}>
            <h2 className={(todo.isDone)? 'done' : ''} onClick={onToggleTodo}>
                Todo: {todo.txt}
            </h2>
            <h4>Todo Importance: {todo.importance}</h4>
            <div className="todo-color" style={{ 
                backgroundColor: todo.color, 
                width: '20px', 
                height: '20px', 
                borderRadius: '50%', 
                display: 'inline-block',
                marginLeft: '10px'
            }}></div>
            <img src={`../assets/img/${'todo'}.png`} alt="" />
        </article>
    )
}
