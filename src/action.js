import axios from 'axios';

/*
 * action types
 */
export const GET_TODO_SUCCESS = 'GET_TODO_SUCCESS';
export const GET_TODO_FAILURE = 'GET_TODO_FAILURE';

export const ADD_TODO_SUCCESS = 'ADD_TODO_SUCCESS';
export const ADD_TODO_FAILURE = 'ADD_TODO_FAILURE';

export const DELETE_TODO_SUCCESS = 'DELETE_TODO_SUCCESS';
export const DELETE_TODO_FAILURE = 'DELETE_TODO_FAILURE';

export const COMPLETE_TODO = 'COMPLETE_TODO';
export const EDIT_TODO = 'EDIT_TODO';

/*
 * action creators
 */
/* TODO LIST */
export const getTodoRequest = () => {
    return (dispatch) => {
        // dispatch({type:GET_TODO});
        axios.get('/api/todo')
            .then(({ data }) => {
                dispatch(getTodoSuccess(data));
            }).catch((error) => {
                dispatch(getTodoFailure(error));
        });
    };
};

export function getTodoSuccess(todos){
    return {
        type: GET_TODO_SUCCESS,
        todos
    };
}

export function getTodoFailure(error){
    return {
        type: GET_TODO_FAILURE,
        error
    };
}

/* ADD TODO */
export function addTodoRequest(content) {
    return (dispatch) => {
        axios.post('/api/todo', {content})
            .then(({ data }) => {
                dispatch(addTodoSuccess(data.todo))
            })
            .catch((error) => {
                dispatch(addTodoFailure(error));
            });
    };
}

export function addTodoSuccess(todo){
    return {
        type: ADD_TODO_SUCCESS,
        todo
    };
}

export function addTodoFailure(error){
    return {
        type: ADD_TODO_FAILURE,
        error
    }
}

/* DELETE TODO */
export function deleteTodoRequest(id) {
    return (dispatch) => {

        return axios.delete('/api/todo/' + id)
            .then((response) => {
                dispatch(deleteTodoSuccess(response.data.todo))
            }).catch((error) => {
                dispatch(deleteTodoFailure(error));
            })
    }
}

export function deleteTodoSuccess(todo){
    return {
        type: DELETE_TODO_SUCCESS,
        todo
    }
}

export function deleteTodoFailure(error){
    return {
        type: DELETE_TODO_FAILURE,
        error
    }
}

export function completeTodo(index, completed) {
    return {
        type: COMPLETE_TODO,
        index: index,
        completed: completed
    };
}

export function editTodo(index, content) {
    return {
        type: EDIT_TODO,
        index: index,
        content: content
    }
}
