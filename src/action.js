import axios from 'axios';

/*
 * action types
 */
export const GET_TODO = 'GET_TODO';
export const ADD_TODO = 'ADD_TODO';
export const COMPLETE_TODO = 'COMPLETE_TODO';
export const EDIT_TODO = 'EDIT_TODO';
export const DELETE_TODO = 'DELETE_TODO';

/*
 * action creators
 */

export const getTodo = () => {
    return (dispatch) => {
        axios.get('/api/todo')
            .then(({ data }) => {
                dispatch(getTodoData(data));
                }
            );
    };
};


export function addTodo(content) {
    console.log("action:", content);
    return (dispatch) => {
        axios.post('/api/todo', {content})
            .then( () => {
                Promise.all([
                    dispatch(getTodo())
                ])
            })
            .catch((error) => {
                const {response} = error;

                if (response.status === 401) {
                    window.location.href = response.data.nextUrl;
                } else {
                    alert(response.data);
                }
            });
    };
}

const getTodoData = (todos) => ({
    type: GET_TODO,
    todos
});

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

export function deleteTodo(index) {
    return {
        type: DELETE_TODO,
        index: index
    }
}