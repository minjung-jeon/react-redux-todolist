import {ADD_TODO, GET_TODO, COMPLETE_TODO, EDIT_TODO, DELETE_TODO} from './action';
import { Map, List, fromJS } from 'immutable';

/**
 * { todos : [{ id : number, content: string, completed : boolean }] }
 */
const todoState = Map({
    todos: List([])
});
const todoReducer = (state = todoState, action) => {
    const todos = state.get('todos');
    switch (action.type) {
        case ADD_TODO:
            return state.set('todos', todos.push(Map({
                id: String(Date.now()),
                content: action.content,
                completed: false,
                isEdit: false
            })));
        case GET_TODO:
            return  state.update('todos', todo => todo = List(fromJS(action.todos)));
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