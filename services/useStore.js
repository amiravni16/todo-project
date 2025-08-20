import { useState, useEffect } from 'react'
import { storeService } from './store.service.js'

export function useStore() {
    const [state, setState] = useState(storeService.getState())

    useEffect(() => {
        // Subscribe to store changes
        const unsubscribe = storeService.subscribe((newState) => {
            setState(newState)
        })

        // Cleanup subscription on unmount
        return unsubscribe
    }, [])

    return {
        // State
        todos: state.todos,
        isLoading: state.isLoading,
        filterBy: state.filterBy,
        user: state.user,

        // Actions
        loadTodos: storeService.loadTodos.bind(storeService),
        addTodo: storeService.addTodo.bind(storeService),
        updateTodo: storeService.updateTodo.bind(storeService),
        removeTodo: storeService.removeTodo.bind(storeService),
        toggleTodo: storeService.toggleTodo.bind(storeService),
        setFilter: storeService.setFilter.bind(storeService),
        login: storeService.login.bind(storeService),
        signup: storeService.signup.bind(storeService),
        logout: storeService.logout.bind(storeService),
        setUser: storeService.setUserFromComponent.bind(storeService)
    }
}
