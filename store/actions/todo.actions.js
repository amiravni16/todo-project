import { todoService } from '../../services/todo.service.js'
import {
  SET_IS_LOADING,
  ADD_TODO,
  REMOVE_TODO,
  SET_TODOS,
  UPDATE_TODO,
  store,
  SET_DONE_TODOS_PERCENT,
  SET_MAX_PAGE,
  SET_FILTER_BY,
} from '../store.js'
import { addActivity } from './user.actions.js'

export function loadTodos(filterBy) {
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })
    return todoService
        .query(filterBy)
        .then((todos) => {
            store.dispatch({
                type: SET_TODOS,
                todos,
            })
            // Update done todos percentage
            return todoService.getDoneTodosPercent()
                .then(doneTodosPercent => {
                    store.dispatch({
                        type: SET_DONE_TODOS_PERCENT,
                        doneTodosPercent,
                    })
                    return todos
                })
        })
        .catch((err) => {
            console.error('Cannot load todos:', err)
            throw err
        })
        .finally(() => {
            store.dispatch({ type: SET_IS_LOADING, isLoading: false })
        })
}

export function saveTodo(todo) {
    const type = todo._id ? UPDATE_TODO : ADD_TODO
    return todoService
        .save(todo)
        .then((savedTodo) => {
            store.dispatch({
                type,
                todo: savedTodo,
            })
            // Update done todos percentage
            return todoService.getDoneTodosPercent()
                .then(doneTodosPercent => {
                    store.dispatch({
                        type: SET_DONE_TODOS_PERCENT,
                        doneTodosPercent,
                    })
                    return savedTodo
                })
        })
        .catch((err) => {
            console.error('Cannot save todo:', err)
            throw err
        })
}

export function removeTodo(todoId) {
    return todoService
        .remove(todoId)
        .then(() => {
            store.dispatch({
                type: REMOVE_TODO,
                todoId,
            })
            // Update done todos percentage
            return todoService.getDoneTodosPercent()
                .then(doneTodosPercent => {
                    store.dispatch({
                        type: SET_DONE_TODOS_PERCENT,
                        doneTodosPercent,
                    })
                })
        })
        .catch((err) => {
            console.error('Cannot remove todo:', err)
            throw err
        })
}

export function setFilterBy(filterBy) {
    store.dispatch({
        type: SET_FILTER_BY,
        filterBy,
    })
}
