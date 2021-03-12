import * as constants from '../constant'

export const fetchAllTodo = () => ({
    type : constants.API,
    payload: {
        methode : 'GET',
        url : '/api/TodoCategory',
        success : (response) => (setAllTodo(response))
    }
})

export const CreateTodo = (data, onSuccess, onError) => ({
    type: constants.API,
    payload: {
        method: 'POST',
        url: '/api/TodoCategory',
        data, 
        succes: (todo) => (addTodo(todo)),
        postProcessError : onError,
        postProcessSuccess : onSuccess,
    }
})

export const getCategoryId = (id, onSuccess) => ({
    type : constants.API,
    payload: {
        method: 'GET',
        url : `/api/TodoCategory/${id}`,
        postProcessSuccess: onSuccess
    }
})

export const updateCategoryId = (id, data, onSuccess, onError) => ({
    type: constants.API,
    payload: {
        method: 'PUT',
        url: `/api/TodoCategory/${id}`,
        data,
        success: (id, data) => (updateTodo(id, data)),
        postProcessSuccess: onSuccess,
        postProcessError: onError
    }
})

export const deleteCategoryById = (id, onSuccess, onError) => ({
    type: constants.API,
    payload: {
        method: 'DELETE',
        url : `/api/TodoCategory/${id}`,
        success: () => (deleteTodoCategory(id)),
        postProcessSuccess: onSuccess,
        postProcessError: onError
    }
})

const addTodo = (todo) => ({
    type : constants.CREATE_TODO,
    payload : todo
})

const setAllTodo = (data) => ({
    type : constants.FETCH_ALL_TODO,
    payload: data
})

const updateTodo = (id, data) => ({
    type : constants.UPDATE_TODO,
    payload : {id, data}
})

const deleteTodoCategory = (id) => ({
    type: constants.DELETE_TODO,
    payload: id
})