/*
 * action types
 */

export const ADD_TODO = 'ADD_TODO';
export const COMPLETE_TODO = 'COMPLETE_TODO';
export const EDIT_TODO = 'EDIT_TODO';
export const DELETE_TODO = 'DELETE_TODO';

/*
 * action creators
 */

export function addTodo(content) {
    return {
        type: ADD_TODO,
        content: content
    };
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

export function deleteTodo(index) {
    return {
        type: DELETE_TODO,
        index: index
    }
}