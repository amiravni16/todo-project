const { createStore, compose, applyMiddleware, combineReducers } = Redux

// Import the new store modules
import { todoReducer } from './todoStore.js'
import { userReducer } from './userStore.js'
import { userService } from '../services/user.service.js'
import { utilService } from '../services/util.service.js'

// Export action types for actions to import
export const SET_IS_LOADING = 'SET_IS_LOADING'
export const SET_TODOS = 'SET_TODOS'
export const SET_DONE_TODOS_PERCENT = 'SET_DONE_TODOS_PERCENT'
export const SET_MAX_PAGE = 'SET_MAX_PAGE'
export const ADD_TODO = 'ADD_TODO'
export const REMOVE_TODO = 'REMOVE_TODO'
export const UPDATE_TODO = 'UPDATE_TODO'
export const SET_FILTER_BY = 'SET_FILTER_BY'

export const SET_USER = 'SET_USER'
export const SET_USER_BALANCE = 'SET_USER_BALANCE'

// Simple Thunk Middleware
function thunkMiddleware(store) {
    return function(next) {
        return function(action) {
            if (typeof action === 'function') {
                return action(store.dispatch, store.getState)
            }
            return next(action)
        }
    }
}

// Combine the reducers
const rootReducer = combineReducers({
    todos: todoReducer,
    user: userReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
    rootReducer, 
    composeEnhancers(applyMiddleware(thunkMiddleware))
)

// Initialize user colors if there's a logged-in user
// Check for logged-in user and apply their colors
const loggedInUser = userService.getLoggedinUser()
if (loggedInUser && loggedInUser.preferences) {
    if (loggedInUser.preferences.bgColor) {
        utilService.setCssVarVal('--clr1', loggedInUser.preferences.bgColor)
    }
    if (loggedInUser.preferences.color) {
        utilService.setCssVarVal('--clr2', loggedInUser.preferences.color)
    }
}
