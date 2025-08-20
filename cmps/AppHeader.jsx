const { Link, NavLink } = ReactRouterDOM
const { useNavigate } = ReactRouter

import { UserMsg } from "./UserMsg.jsx"
import { LoginSignup } from './LoginSignup.jsx'
import { useStore } from '../services/useStore.js'


export function AppHeader() {
    const navigate = useNavigate()
    const { user, logout, setUser } = useStore()
    
    function onLogout() {
        logout()
        navigate('/')
    }

    function onSetUser(user) {
        setUser(user)
        navigate('/')
    }
    return (
        <header className="app-header full main-layout">
            <section className="header-container">
                <h1>React Todo App</h1>
                {user ? (
                    < section >
                        <Link to={`/user/${user._id}`}>Hello {user.fullname}</Link>
                        <button onClick={onLogout}>Logout</button>
                    </ section >
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
            </section>
            <UserMsg />
        </header>
    )
}
