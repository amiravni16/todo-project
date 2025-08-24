import { userService } from '../../services/user.service.js'
import { utilService } from '../../services/util.service.js'
import { SET_USER, SET_USER_BALANCE } from '../store.js'

// Action Creators (Pure Functions)
export const setUser = (user) => ({
    type: SET_USER,
    user
})

export const setUserBalance = (balance) => ({
    type: SET_USER_BALANCE,
    balance
})

// Async Actions (Thunks)
export function login(credentials) {
    return async (dispatch) => {
        try {
            const user = await userService.login(credentials)
            dispatch(setUser(user))
            
            // Apply user's color preferences immediately after login
            if (user.preferences) {
                if (user.preferences.bgColor) {
                    utilService.setCssVarVal('--clr1', user.preferences.bgColor)
                }
                if (user.preferences.color) {
                    utilService.setCssVarVal('--clr2', user.preferences.color)
                }
            }
            
            return user
        } catch (err) {
            console.error('Cannot login:', err)
            throw err
        }
    }
}

export function signup(credentials) {
    return async (dispatch) => {
        try {
            const user = await userService.signup(credentials)
            dispatch(setUser(user))
            
            // Apply default color preferences for new users
            utilService.setCssVarVal('--clr1', 'rgb(96, 107, 91)') // Default clr1
            utilService.setCssVarVal('--clr2', 'rgb(120, 99, 110)') // Default clr2
            
            return user
        } catch (err) {
            console.error('Cannot signup:', err)
            throw err
        }
    }
}

export function logout() {
    return async (dispatch) => {
        try {
            await userService.logout()
            dispatch(setUser(null))
            
            // Reset colors to default when logging out
            utilService.setCssVarVal('--clr1', 'rgb(96, 107, 91)') // Default clr1
            utilService.setCssVarVal('--clr2', 'rgb(120, 99, 110)') // Default clr2
        } catch (err) {
            console.error('Cannot logout:', err)
            throw err
        }
    }
}

export function addActivity(txt) {
    return async (dispatch, getState) => {
        try {
            const updatedUser = await userService.addActivity(txt)
            dispatch(setUser(updatedUser))
            return updatedUser
        } catch (err) {
            console.error('Cannot add activity:', err)
            throw err
        }
    }
}

export function changeBalance(amount) {
    return async (dispatch, getState) => {
        try {
            const newBalance = await userService.updateBalance(amount)
            dispatch(setUserBalance(newBalance))
            return newBalance
        } catch (err) {
            console.error('Cannot change balance:', err)
            throw err
        }
    }
}

export function updateUser(userToUpdate) {
    return async (dispatch) => {
        try {
            const updatedUser = await userService.updateUserPreferences(userToUpdate)
            dispatch(setUser(updatedUser))
            return updatedUser
        } catch (err) {
            console.error('Cannot update user:', err)
            throw err
        }
    }
}
