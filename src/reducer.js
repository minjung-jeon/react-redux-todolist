import {
    ADD_TODO_SUCCESS,
    ADD_TODO_FAILURE,
    GET_TODO_SUCCESS,
    GET_TODO_FAILURE,
    COMPLETE_TODO,
    EDIT_TODO,
    DELETE_TODO
} from './action';
import { Map, List, fromJS } from 'immutable';

/**
 * { todos : [{ id : number, content: string, completed : boolean }] }
 */
const todoState = Map({
    todos: List([]),
    error: List([])
});
const todoReducer = (state = todoState, action) => {
    const todos = state.get('todos');
    const error = state.get('error');

    switch (action.type) {
        case GET_TODO_SUCCESS:
            return state.update('todos', todo => todo = List(fromJS(action.todos)));
        case GET_TODO_FAILURE:
            return state.update('error', error => error = List(fromJS(action.error)));

        case ADD_TODO_SUCCESS:
            return state.set('todos', todos.push(Map(action.todo)));
        case ADD_TODO_FAILURE:
            return state.update('error', error => error = List(fromJS(action.error)));

        case COMPLETE_TODO:
            return state.set('todos', todos.update(
                action.index,
                (todo) => todo.set('completed', action.completed)
            ));
        case EDIT_TODO:
            return state.set('todos', todos.update(
                action.index,
                (todo) => todo.set('content', action.content)
                    .set('isEdit', false)
            ));
        case DELETE_TODO:
            return state.set('todos', todos.delete(
                action.index,
            ));
        default:
            return state;
    }
};

export default todoReducer;