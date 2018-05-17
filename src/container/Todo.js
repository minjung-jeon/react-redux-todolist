import React, {Component} from "react";
import update from 'immutability-helper';
import TodoAdd from "../component/todo-add/TodoAdd";
import TodoList from "../component/todo-list/TodoList";

export default class Todo extends Component {
    constructor(props) {
        super(props);

        /**
         * { todos : [{ id : number, content: string, complete : boolean }] }
         */
        this.state = {
            todos: []
        };

        this.selectedKey = -1;

        // 현재 context 를 바인딩한 새로운 함수를 생성
        this.handleAddedDataFn = this.handleAddedData.bind(this);
        this.handleRemovedDataFn = this.handleRemovedData.bind(this);
        this.handleEditDataFn = this.handleEditData.bind(this);
        this.handleSelectFn = this.handleSelect.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log("shouldComponentUpdate");
        return nextState.todos !== this.state.todos;
    }

    handleSelect(idx){ // reset 할 때 idx없으면 -1로...
        this.selectedKey = idx;
    }

    handleAddedData(todo) {
        this.setState({
            todos: update(this.state.todos, {
                $push: [
                    {
                        id: String(Date.now()),
                        content: todo,
                        isEdit: false
                    }
                ]
            })
        });
    }

    handleRemovedData() {
        this.setState({
            todos: update(this.state.todos, {
                $splice: [[this.selectedKey, 1]]
            })
        });
        this.handleSelect(-1);
    }

    handleEditData(id, content) {
        this.setState({
            todos: update(this.state.todos, {
                [this.selectedKey] : {
                    content: {$set: content},
                    isEdit: {$set: false}
                }
            })
        });
        this.handleSelect(-1); //reset
    }

    render() {
        console.log("Todo render");

        return (
            <div className="g-row">
                <div className="g-col">
                    <TodoAdd handleAddedDataFn={this.handleAddedDataFn}/>
                </div>
                <div className="g-col">
                    <TodoList
                        todos={this.state.todos}
                        editFunc={this.handleEditDataFn}
                        deleteFunc={this.handleRemovedDataFn}
                        selectFunc={this.handleSelectFn}
                    />
                </div>
            </div>
        );
    }
}
