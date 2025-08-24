import { todoService } from '../../services/todo.service.js'
import { addActivity, changeBalance } from './user.actions.js'
import { 
    SET_IS_LOADING, 
    SET_TODOS, 
    ADD_TODO, 
    REMOVE_TODO, 
    UPDATE_TODO, 
    SET_FILTER_BY, 
    SET_DONE_TODOS_PERCENT 
} from '../store.js'

// Action Creators (Pure Functions)
export const setIsLoading = (isLoading) => ({
    type: SET_IS_LOADING,
    isLoading
})

export const setTodos = (todos) => ({
    type: SET_TODOS,
    todos
})

export const addTodo = (todo) => ({
    type: ADD_TODO,
    todo
})

export const removeTodoAction = (todoId) => ({
    type: REMOVE_TODO,
    todoId
})

export const updateTodo = (todo) => ({
    type: UPDATE_TODO,
    todo
})

export const setFilterBy = (filterBy) => ({
    type: SET_FILTER_BY,
    filterBy
})

export const setDoneTodosPercent = (doneTodosPercent) => ({
    type: SET_DONE_TODOS_PERCENT,
    doneTodosPercent
})

// Async Actions (Thunks)
export function loadTodos(filterBy) {
    return async (dispatch, getState) => {
        try {
            dispatch(setIsLoading(true))
            
            const todos = await todoService.query(filterBy)
            dispatch(setTodos(todos))
            
            const doneTodosPercent = await todoService.getDoneTodosPercent()
            dispatch(setDoneTodosPercent(doneTodosPercent))
            
            return todos
        } catch (err) {
            console.error('Cannot load todos:', err)
            throw err
        } finally {
            dispatch(setIsLoading(false))
        }
    }
}

export function saveTodo(todo) {
    return async (dispatch, getState) => {
        try {
            const savedTodo = await todoService.save(todo)
            
            if (todo._id) {
                dispatch(updateTodo(savedTodo))
            } else {
                dispatch(addTodo(savedTodo))
            }
            
            // Update done todos percentage
            const doneTodosPercent = await todoService.getDoneTodosPercent()
            dispatch(setDoneTodosPercent(doneTodosPercent))
            
            // Add activity for the user
            const state = getState()
            if (state.user.user) {
                const actionName = todo._id ? 'Updated' : 'Added'
                await dispatch(addActivity(`${actionName} a Todo: ${todo.txt}`))
            }
            
            // Check if todo was marked as done and increase balance
            if (state.user.user && savedTodo.isDone && !todo.isDone) {
                // Todo was just marked as done, increase balance by 10
                const newBalance = await dispatch(changeBalance(10))
                
                // Add a special activity for balance increase
                await dispatch(addActivity(`Completed todo and earned $10! Balance: $${newBalance}`))
            }
            
            return savedTodo
        } catch (err) {
            console.error('Cannot save todo:', err)
            throw err
        }
    }
}

export function removeTodo(todoId) {
    return async (dispatch, getState) => {
        try {
            await todoService.remove(todoId)
            dispatch(removeTodoAction(todoId))
            
            // Update done todos percentage
            const doneTodosPercent = await todoService.getDoneTodosPercent()
            dispatch(setDoneTodosPercent(doneTodosPercent))
            
            // Add activity for the user
            const state = getState()
            if (state.user.user) {
                await dispatch(addActivity('Removed a Todo'))
            }
        } catch (err) {
            console.error('Cannot remove todo:', err)
            throw err
        }
    }
}
