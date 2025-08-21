import { userService } from '../../services/user.service.js'
import { SET_USER, store } from '../store.js'

export function login(credentials) {
    return userService.login(credentials)
        .then(user => {
            store.dispatch({
                type: SET_USER,
                user
            })
            return user
        })
        .catch(err => {
            console.error('Cannot login:', err)
            throw err
        })
}

export function signup(credentials) {
    return userService.signup(credentials)
        .then(user => {
            store.dispatch({
                type: SET_USER,
                user
            })
            return user
        })
        .catch(err => {
            console.error('Cannot signup:', err)
            throw err
        })
}

export function logout() {
    return userService.logout()
        .then(() => {
            store.dispatch({
                type: SET_USER,
                user: null
            })
        })
        .catch(err => {
            console.error('Cannot logout:', err)
            throw err
        })
}

export function addActivity(userId, activityTxt) {
    return userService.addActivity(userId, activityTxt)
        .then(updatedUser => {
            store.dispatch({
                type: SET_USER,
                user: updatedUser
            })
            return updatedUser
        })
        .catch(err => {
            console.error('Cannot add activity:', err)
            throw err
        })
}

export function updateBalance(userId, amount) {
    return userService.updateBalance(userId, amount)
        .then(updatedUser => {
            store.dispatch({
                type: SET_USER,
                user: updatedUser
            })
            return updatedUser
        })
        .catch(err => {
            console.error('Cannot update balance:', err)
            throw err
        })
}

export function updateUserPreferences(userId, preferences) {
    return userService.updateUserPreferences(userId, preferences)
        .then(updatedUser => {
            store.dispatch({
                type: SET_USER,
                user: updatedUser
            })
            return updatedUser
        })
        .catch(err => {
            console.error('Cannot update user preferences:', err)
            throw err
        })
}

export function updateUserPrefs(userId, prefs) {
    return userService.updateUserPrefs(userId, prefs)
        .then(updatedUser => {
            store.dispatch({
                type: SET_USER,
                user: updatedUser
            })
            return updatedUser
        })
        .catch(err => {
            console.error('Cannot update user prefs:', err)
            throw err
        })
}
