const { Link, NavLink } = ReactRouterDOM
const { useNavigate } = ReactRouter

import { UserMsg } from "./UserMsg.jsx"
import { LoginSignup } from './LoginSignup.jsx'
import { logout, addActivity } from '../store/actions/user.actions.js'

const { useSelector } = ReactRedux

export function AppHeader() {
    const navigate = useNavigate()
    const todos = useSelector((storeState) => storeState.todos)
    const user = useSelector(storeState => storeState.user)
    const doneTodosPercent = useSelector(storeState => storeState.doneTodosPercent)
    
    const formattedPercent = todos ? doneTodosPercent.toFixed(2) + '%' : null
    
    function onLogout() {
        logout()
        navigate('/')
    }

    function onSetUser(user) {
        // This will be handled by the LoginSignup component
        navigate('/')
    }
    return (
        <header className="app-header full main-layout">
            <section className="header-container">
                <h1>React Todo App</h1>
                {user ? (
                    <section className="user-info">
                        <div className="user-details">
                            <div className="user-name-balance">
                                <Link to={`/user/${user._id}`}>Hello {user.fullname}</Link>
                                <span className="user-balance">${user.balance || 10000}</span>
                            </div>
                            <div className="user-actions">
                                <Link to={`/user/${user._id}`} className="profile-link">Profile</Link>
                                <button onClick={onLogout}>Logout</button>
                            </div>
                        </div>
                        {user.activities && user.activities.length > 0 && (
                            <div className="user-activities">
                                <h4>Recent Activities:</h4>
                                <ul>
                                    {user.activities.slice(-3).map((activity, index) => (
                                        <li key={index}>
                                            {activity.txt} - {new Date(activity.at).toLocaleDateString()}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </section>
                ) : (
                    <section>
                        <LoginSignup onSetUser={onSetUser} />
                    </section>
                )}
                <nav className="app-nav">
                    <NavLink to="/" >Home</NavLink>
                    <NavLink to="/about" >About</NavLink>
                    <NavLink to="/todo" >Todos</NavLink>
                    <NavLink to="/dashboard" >Dashboard</NavLink>
                </nav>
                        {todos &&
                            <section className="todos-progress">
                                <h3>you have finished {formattedPercent}</h3>
                                <div className="progress-bar-container" >
                                    <span>{formattedPercent}</span>
                                    <div style={{ width: formattedPercent }}>

                                    </div>
                                </div>
                            </section>
                        }
            </section>
            <UserMsg />
        </header>
    )
}
