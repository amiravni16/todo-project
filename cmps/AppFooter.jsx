const { useSelector } = ReactRedux

export function AppFooter() {
    const todos = useSelector((storeState) => storeState.todos.todos)
    const doneTodosPercent = useSelector(storeState => storeState.todos.doneTodosPercent)
    
    const formattedPercent = todos ? doneTodosPercent.toFixed(2) + '%' : null

    return (
        <footer className="app-footer full main-layout">
            <section className="footer-container">
                <div className="footer-content">
                    <p>&copy; 2024 React Todo App. All rights reserved.</p>
                    {todos && (
                        <section className="todos-progress">
                            <h3>you have finished {formattedPercent}</h3>
                            <div className="progress-bar-container" >
                                <span>{formattedPercent}</span>
                                <div style={{ width: formattedPercent }}>

                                </div>
                            </div>
                        </section>
                    )}
                </div>
            </section>
        </footer>
    )
}
