import * as constans from '../constant'

export const getCategoryById = (todoCategoryID, onSuccess) => ({
    type: constans.API,
    payload: {
        method : 'GET',
        url : `/api/TodoList/${todoCategoryID}`,
        postProcessSuccess: onSuccess
    }
}) 

export const createSubTodo = (data, onSuccess, onError) => ({
    type: constans.API,
    payload: {
        method: 'POST',
        url : '/api/TodoList',
        data, 
        success: (subTodo) => (AddSubTodo(subTodo)),
        postProcessError: onError, 
        postProcessSuccess: onSuccess,
    }
})

export const getDetailSubCategory = (id, onSuccess) => ({
    type: constans.API,
    payload: {
        method: `GET`,
        url : `/api/TodoList/List/${id}`,
        postProcessSuccess: onSuccess
    }
})

export const updateSubCategory = (id, data, onSuccess, onError) => ({
    type: constans.API,
    payload: {
        method: 'PUT',
        url:`/api/TodoList/${id}`,
        data,
        success: (id, data) => (updateDetail(id, data)),
        postProcessSuccess: onSuccess,
        postProcessError: onError
    }
})

export const getDeleteSubCategory = (id, onSuccess, onError) => ({
    type: constans.API,
    payload: {
        method: 'DELETE',
        url : `/api/TodoList/${id}`,
        success: () => (deleteSubCategory(id)),
        postProcessSuccess: onSuccess,
        postProcessError: onError
    }
})

const AddSubTodo = (subTodo) => ({
    type: constans.CREATE_SUB_TODO,
    payload : subTodo
})

const updateDetail = (id, data) => ({
    type : constans.UPDATE_SUB_TODO,
    payload : {id, data}
})

const deleteSubCategory = (id) => ({
    type: constans.DELETE_SUB_TODO,
    payload: id
})