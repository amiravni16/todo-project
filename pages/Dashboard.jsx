const { useEffect, useState } = React
import {Chart} from '../cmps/Chart.jsx'
import { todoService } from '../services/todo.service.js'
const { useSelector } = ReactRedux

export function Dashboard() {
    const todos = useSelector(storeState => storeState.todos.todos)
    const user = useSelector(storeState => storeState.user.user)
    
    const totalTodos = todos ? todos.length : 0
    const completedTodos = todos ? todos.filter(todo => todo.isDone).length : 0
    const pendingTodos = totalTodos - completedTodos
    const completionRate = totalTodos > 0 ? ((completedTodos / totalTodos) * 100).toFixed(1) : 0

    return (
        <section className="dashboard">
            <h1>Dashboard</h1>
            
            {user && (
                <div className="user-summary">
                    <h2>Welcome, {user.fullname}!</h2>
                    <p>Current Balance: ${user.balance || 10000}</p>
                    {user.activities && user.activities.length > 0 && (
                        <div className="recent-activities">
                            <h3>Recent Activities</h3>
                            <ul>
                                {user.activities.slice(-5).map((activity, index) => (
                                    <li key={index}>
                                        {activity.txt} - {new Date(activity.at).toLocaleDateString()}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}
            
            <div className="stats-grid">
                <div className="stat-card">
                    <h3>Total Todos</h3>
                    <p className="stat-number">{totalTodos}</p>
                </div>
                
                <div className="stat-card">
                    <h3>Completed</h3>
                    <p className="stat-number completed">{completedTodos}</p>
                </div>
                
                <div className="stat-card">
                    <h3>Pending</h3>
                    <p className="stat-number pending">{pendingTodos}</p>
                </div>
                
                <div className="stat-card">
                    <h3>Completion Rate</h3>
                    <p className="stat-number">{completionRate}%</p>
                </div>
            </div>
            
            {todos && todos.length > 0 && (
                <div className="todo-summary">
                    <h3>Todo Summary</h3>
                    <div className="todo-chart">
                        <div className="chart-bar">
                            <div className="bar-label">Completed</div>
                            <div className="bar-container">
                                <div 
                                    className="bar completed" 
                                    style={{ width: `${completionRate}%` }}
                                ></div>
                            </div>
                            <div className="bar-value">{completedTodos}</div>
                        </div>
                        
                        <div className="chart-bar">
                            <div className="bar-label">Pending</div>
                            <div className="bar-container">
                                <div 
                                    className="bar pending" 
                                    style={{ width: `${100 - completionRate}%` }}
                                ></div>
                            </div>
                            <div className="bar-value">{pendingTodos}</div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}