import { storageService } from "./async-storage.service.js"


export const userService = {
    getLoggedinUser,
    login,
    logout,
    signup,
    getById,
    query,
    getEmptyCredentials,
    updateBalance,
    addActivity,
    updateUserPreferences,
    getDefaultPreferences
}
const STORAGE_KEY_LOGGEDIN = 'user'
const STORAGE_KEY = 'userDB'

function query() {
    return storageService.query(STORAGE_KEY)
}

function getById(userId) {
    return storageService.get(STORAGE_KEY, userId)
}

function login({ username, password }) {
    return storageService.query(STORAGE_KEY)
        .then(users => {
            const user = users.find(user => user.username === username)
            if (user) return _setLoggedinUser(user)
            else return Promise.reject('Invalid login')
        })
}

function signup({ username, password, fullname }) {
    const user = { 
        username, 
        password, 
        fullname,
        balance: 10000,
        activities: [],
        preferences: getDefaultPreferences()
    }
    user.createdAt = user.updatedAt = Date.now()

    return storageService.post(STORAGE_KEY, user)
        .then(_setLoggedinUser)
}

function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN)
    return Promise.resolve()
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN))
}

function _setLoggedinUser(user) {
    const userToSave = { 
        _id: user._id, 
        fullname: user.fullname,
        balance: user.balance || 10000,
        preferences: user.preferences || getDefaultPreferences(),
        activities: user.activities || []
    }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(userToSave))
    return userToSave
}

function getEmptyCredentials() {
    return {
        fullname: 'Admin Adminov',
        username: 'admin',
        password: 'admin'
    }
}

function updateBalance(diff) {
    const loggedinUser = getLoggedinUser()
    if (!loggedinUser) return
    return getById(loggedinUser._id)
        .then(user => {
            user.balance += diff
            return storageService.put(STORAGE_KEY, user)
                .then((user) => {
                    _setLoggedinUser(user)
                    return user.balance
                })
        })
}

function addActivity(txt) {
    const activity = {
        txt,
        at: Date.now()
    }
    
    const loggedinUser = getLoggedinUser()
    if (!loggedinUser) return Promise.reject('No loggedin user')
    return getById(loggedinUser._id)
        .then(user => {
            if (!user.activities) user.activities = []
            user.activities.unshift(activity)
            return user
        })
        .then(userToUpdate => {
            return storageService.put(STORAGE_KEY, userToUpdate)
                .then((savedUser) => {
                    _setLoggedinUser(savedUser)
                    return savedUser
                })
        })
}

function updateUserPreferences(userToUpdate) {
    const loggedinUserId = getLoggedinUser()._id
    return getById(loggedinUserId)
        .then(user => {
            user = { ...user, ...userToUpdate }
            return storageService.put(STORAGE_KEY, user)
                .then((savedUser) => {
                    _setLoggedinUser(savedUser)
                    return savedUser
                })
        })
}

function getDefaultPreferences() {
    return { color: '#eeeeee', bgColor: "#191919", fullname: '' }
}

// signup({username: 'muki', password: 'muki1', fullname: 'Muki Ja'})
// login({username: 'muki', password: 'muki1'})

// Data Model:
// const user = {
//     _id: "KAtTl",
//     username: "muki",
//     password: "muki1",
//     fullname: "Muki Ja",
//     balance: 10000,
//     activities: [{txt: 'Added a Todo', at: 1523873242735}],
//     preferences: {
//         color: '#eeeeee',
//         bgColor: '#191919'
//     },
//     createdAt: 1711490430252,
//     updatedAt: 1711490430999
// }
// }