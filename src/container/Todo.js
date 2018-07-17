import React, {Component} from "react";
import { connect } from 'react-redux';
import {getTodo, addTodo, completeTodo, editTodo, deleteTodo} from "../action";

import TodoAdd from "../component/todo-add/TodoAdd";
import TodoList from "../component/todo-list/TodoList";

class Todo extends Component {
    constructor(props) {
        super(props);
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     console.log("shouldComponentUpdate");
    //     return nextState.todos !== this.props.store.getState().todos;
    // }

    componentDidMount() {
        this.props.getTodos();
    }

    render() {
        console.log("Todo render");
        const { todos } = this.props;

        return (
            <div className="g-row">
                <div className="g-col">
                    <TodoAdd handleAddedDataFn={this.props.addData}/>
                </div>
                <div className="g-col">
                    <TodoList
                        todos={todos}
                        editFunc={this.props.editData}
                        deleteFunc={this.props.deleteData}
                        completeFunc={this.props.completeData}
                    />
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getTodos : () => dispatch(getTodo()),
        addData : (content) => dispatch(addTodo(content)),
        editData: (index, content) => dispatch(editTodo(index, content)),
        deleteData: (index) => dispatch(deleteTodo(index)),
        completeData: (index, complete) => dispatch(completeTodo(index, complete))
    }
};

const mapStateToProps = (state) => {
    const todos = state.get('todos').toJS();

    return {
        todos
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Todo);
