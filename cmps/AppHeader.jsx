const { Link, NavLink } = ReactRouterDOM
const { useNavigate } = ReactRouter

import { UserMsg } from "./UserMsg.jsx"
import { LoginSignup } from './LoginSignup.jsx'
import { logout } from '../store/actions/user.actions.js'

const { useSelector } = ReactRedux

export function AppHeader() {
    const navigate = useNavigate()
    const user = useSelector(storeState => storeState.user)
    const doneTodosPercent = useSelector(storeState => storeState.doneTodosPercent)
    
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
                            <Link to={`/user/${user._id}`}>Hello {user.fullname}</Link>
                            <p className="user-balance">Balance: ${user.balance || 10000}</p>
                            <button onClick={onLogout}>Logout</button>
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
                {user && (
                    <div className="todos-progress">
                        <div className="progress-info">
                            <span>Todos Progress: {doneTodosPercent}%</span>
                        </div>
                        <div className="progress-bar">
                            <div 
                                className="progress-fill" 
                                style={{ width: `${doneTodosPercent}%` }}
                            ></div>
                        </div>
                    </div>
                )}
            </section>
            <UserMsg />
        </header>
    )
}
