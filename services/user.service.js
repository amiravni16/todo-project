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
    addActivity
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
        activities: []
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
        activities: user.activities || []
    }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(userToSave))
    return userToSave
}

function getEmptyCredentials() {
    return {
        fullname: '',
        username: 'muki',
        password: 'muki1',
        balance: 10000,
        activities: []
    }
}

function updateBalance(userId, amount) {
    return storageService.get(STORAGE_KEY, userId)
        .then(user => {
            user.balance += amount
            user.updatedAt = Date.now()
            return storageService.put(STORAGE_KEY, user)
        })
        .then(updatedUser => {
            // Update session storage if this is the logged-in user
            const loggedInUser = getLoggedinUser()
            if (loggedInUser && loggedInUser._id === userId) {
                _setLoggedinUser(updatedUser)
            }
            return updatedUser
        })
}

function addActivity(userId, activityTxt) {
    return storageService.get(STORAGE_KEY, userId)
        .then(user => {
            if (!user.activities) user.activities = []
            user.activities.push({
                txt: activityTxt,
                at: Date.now()
            })
            user.updatedAt = Date.now()
            return storageService.put(STORAGE_KEY, user)
        })
        .then(updatedUser => {
            // Update session storage if this is the logged-in user
            const loggedInUser = getLoggedinUser()
            if (loggedInUser && loggedInUser._id === userId) {
                _setLoggedinUser(updatedUser)
            }
            return updatedUser
        })
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
//     createdAt: 1711490430252,
//     updatedAt: 1711490430999
// }