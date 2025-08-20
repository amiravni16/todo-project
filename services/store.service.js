import { todoService } from './todo.service.js'
import { userService } from './user.service.js'
import { eventBusService } from './event-bus.service.js'

// Store state
let store = {
    todos: [],
    isLoading: false,
    filterBy: { txt: '', importance: 0 },
    user: null
}

// Store subscribers
let subscribers = []

// Store actions
export const storeService = {
    // State getters
    getTodos() { return store.todos },
    getIsLoading() { return store.isLoading },
    getFilterBy() { return store.filterBy },
    getUser() { return store.user },
    getState() { return { ...store } },

    // State setters
    setTodos(todos) {
        store.todos = todos
        _notifySubscribers()
    },

    setIsLoading(isLoading) {
        store.isLoading = isLoading
        _notifySubscribers()
    },

    setFilterBy(filterBy) {
        store.filterBy = { ...filterBy }
        _notifySubscribers()
    },

    setUser(user) {
        store.user = user
        _notifySubscribers()
    },

    // Todo actions
    async loadTodos(filterBy = null) {
        try {
            this.setIsLoading(true)
            const todos = await todoService.query(filterBy || store.filterBy)
            this.setTodos(todos)
            return todos
        } catch (error) {
            console.error('Failed to load todos:', error)
            eventBusService.emit('show-error', 'Cannot load todos')
            throw error
        } finally {
            this.setIsLoading(false)
        }
    },

    async addTodo(todo) {
        try {
            this.setIsLoading(true)
            const savedTodo = await todoService.save(todo)
            this.setTodos([...store.todos, savedTodo])
            eventBusService.emit('show-success', 'Todo added successfully')
            return savedTodo
        } catch (error) {
            console.error('Failed to add todo:', error)
            eventBusService.emit('show-error', 'Cannot add todo')
            throw error
        } finally {
            this.setIsLoading(false)
        }
    },

    async updateTodo(todo) {
        try {
            this.setIsLoading(true)
            const savedTodo = await todoService.save(todo)
            this.setTodos(store.todos.map(t => t._id === savedTodo._id ? savedTodo : t))
            eventBusService.emit('show-success', 'Todo updated successfully')
            return savedTodo
        } catch (error) {
            console.error('Failed to update todo:', error)
            eventBusService.emit('show-error', 'Cannot update todo')
            throw error
        } finally {
            this.setIsLoading(false)
        }
    },

    async removeTodo(todoId) {
        try {
            this.setIsLoading(true)
            await todoService.remove(todoId)
            this.setTodos(store.todos.filter(todo => todo._id !== todoId))
            eventBusService.emit('show-success', 'Todo removed successfully')
        } catch (error) {
            console.error('Failed to remove todo:', error)
            eventBusService.emit('show-error', 'Cannot remove todo')
            throw error
        } finally {
            this.setIsLoading(false)
        }
    },

    async toggleTodo(todo) {
        const todoToSave = { ...todo, isDone: !todo.isDone }
        return this.updateTodo(todoToSave)
    },

    // Filter actions
    setFilter(filterBy) {
        this.setFilterBy(filterBy)
        this.loadTodos(filterBy)
    },

    // User actions
    async login(credentials) {
        try {
            this.setIsLoading(true)
            const user = await userService.login(credentials)
            this.setUser(user)
            return user
        } catch (error) {
            console.error('Login failed:', error)
            eventBusService.emit('show-error', 'Login failed')
            throw error
        } finally {
            this.setIsLoading(false)
        }
    },

    async signup(credentials) {
        try {
            this.setIsLoading(true)
            const user = await userService.signup(credentials)
            this.setUser(user)
            return user
        } catch (error) {
            console.error('Signup failed:', error)
            eventBusService.emit('show-error', 'Signup failed')
            throw error
        } finally {
            this.setIsLoading(false)
        }
    },

    logout() {
        userService.logout()
        this.setUser(null)
    },

    // Method to set user from external components
    setUserFromComponent(user) {
        this.setUser(user)
    },

    // Subscription management
    subscribe(callback) {
        subscribers.push(callback)
        // Return unsubscribe function
        return () => {
            const index = subscribers.indexOf(callback)
            if (index > -1) {
                subscribers.splice(index, 1)
            }
        }
    }
}

// Initialize store
function _initStore() {
    // Load user from session storage if available
    const user = userService.getLoggedinUser()
    if (user) {
        store.user = user
    }
    
    // Load initial todos
    storeService.loadTodos()
}

function _notifySubscribers() {
    subscribers.forEach(callback => callback(store))
}

// Initialize store when service is imported
_initStore()

// For debugging (easy access from console)
window.storeService = storeService
