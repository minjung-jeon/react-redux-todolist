import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from '../todo-item/TodoItem'

function TodoList({todos, editFunc, deleteFunc, selectFunc, completeFunc}) {
    let todoItems = todos.map((todo, index) => {
        return (
            <TodoItem
                key={todo.id}
                todo={todo}
                index={index}
                editFunc={editFunc}
                deleteFunc={deleteFunc}
                completeFunc={completeFunc}
            />
        );
    });

    return(
        <div className="task-list">
            {todoItems}
        </div>
    );
}

TodoList.propTypes = {
    todos: PropTypes.array.isRequired,
    editFunc: PropTypes.func.isRequired,
    deleteFunc: PropTypes.func.isRequired,
    completeFunc: PropTypes.func.isRequired
};

export default TodoList;