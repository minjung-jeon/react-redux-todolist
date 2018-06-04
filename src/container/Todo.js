import React, {Component} from "react";
import { connect } from 'react-redux';
import update from 'immutability-helper';
import {addTodo, completeTodo, editTodo, deleteTodo} from "../action";

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

    handleAddedDataFn(content){
        this.props.addData(content);
    };

    handleEditDataFn(index, content){
        this.props.editData(index, content);
    }

    handleRemovedDataFn(index){
        this.props.deleteData(index);
    }

    handleCompleteDataFn(index, complete){
        this.props.completeData(index, complete);
    }

    render() {
        console.log("Todo render");
        const { todos } = this.props;

        return (
            <div className="g-row">
                <div className="g-col">
                    <TodoAdd handleAddedDataFn={this.handleAddedDataFn.bind(this)}/>
                </div>
                <div className="g-col">
                    <TodoList
                        todos={todos}
                        editFunc={this.handleEditDataFn.bind(this)}
                        deleteFunc={this.handleRemovedDataFn.bind(this)}
                        completeFunc={this.handleCompleteDataFn.bind(this)}
                    />
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    addData : (content) => dispatch(addTodo(content)),
    editData: (index, content) => dispatch(editTodo(index, content)),
    deleteData: (index) => dispatch(deleteTodo(index)),
    completeData: (index, complete) => dispatch(completeTodo(index, complete))

});
const mapStateToProps = (state) => ({
    todos : state.todos
});

export default connect(mapStateToProps, mapDispatchToProps)(Todo);
