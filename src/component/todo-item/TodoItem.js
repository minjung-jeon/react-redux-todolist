import React, {Component} from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Button from '../button/Button.js';
import Icon from '../icon/Icon.js';

import './TodoItem.scss';

export default class TodoItem extends Component {
    constructor(props) {
        super(props);

        this.onSaveEditItemFn = this.onSaveEditItem.bind(this);
        this.onClickDeleteItemFn = this.onClickDeleteItem.bind(this);
        this.onHandleKeyUpFn = this.onHandleKeyUp.bind(this);
        this.onStopEditingFn = this.onStopEditing.bind(this);
        this.onEditFn = this.onEdit.bind(this);
        this.onToggleCompletedFn = this.onToggleCompleted.bind(this);

        this.state = {
            isEdit: false
        }
    }

    shouldComponentUpdate(nextProps, nextState){
        return (nextProps.todo.id !== this.props.todo.id) || (this.state.isEdit !== nextState.isEdit) || (nextProps.todo.completed !== this.props.todo.completed) ;
    }

    onHandleKeyUp(event){
        if (event.keyCode === 13) {
            this.onSaveEditItemFn(event);
        } else if (event.keyCode === 27) {
            this.onStopEditingFn();
        }
    }

    onSaveEditItem(event) {
        if(this.state.isEdit === false){
            this.setState({isEdit : true});
        } else {
            const content = event.target.value;
            this.props.editFunc(this.props.index, content);
            this.setState({isEdit : false});
        }
    }

    onClickDeleteItem() {
        this.props.deleteFunc(this.props.index);
    }

    onStopEditing() {
        this.setState({isEdit: false});
    }

    onEdit() {
        this.setState({isEdit: true});
    }

    onToggleCompleted() {
        const todo = this.props.todo;
        this.props.completeFunc(this.props.index, !todo.completed);
    }

    renderTitle(task) {
        return (
            <div className="task-item__title" tabIndex="0">
                {task.content}
            </div>
        );
    }

    renderTitleInput(task) {
        return (
            <input
                autoComplete="off"
                autoFocus
                className="task-item__input"
                defaultValue={task.content}
                maxLength="64"
                onKeyUp={this.onHandleKeyUpFn}
                type="text"
            />
        );
    }

    render() {
        console.log('render : '+ this.props.todo.content);
        const editing = this.state.isEdit;
        const task = this.props.todo;

        let containerClasses = classNames('task-item', {
            'task-item--completed': task.completed,
            'task-item--editing': editing
        });

        return (
            <div className={containerClasses}>
                <div className="cell">
                    <Button
                        className={classNames('btn--icon', 'task-item__button', {'active': task.completed, 'hide': editing})}
                        onClick={this.onToggleCompletedFn}>
                        <Icon name="done" />
                    </Button>
                </div>

                <div className="cell">
                    {editing ? this.renderTitleInput(task) : this.renderTitle(task)}
                </div>

                <div className="cell">
                    <Button className={classNames('btn--icon', 'task-item__button', {'hide': editing})} onClick={this.onEditFn}>
                        <Icon name="mode_edit" />
                    </Button>
                    <Button
                        className={classNames('btn--icon', 'task-item__button', {'hide': !editing})}
                        onClick={this.onStopEditingFn}>
                        <Icon name="clear" />
                    </Button>
                    <Button className={classNames('btn--icon', 'task-item__button', {'hide': editing})} onClick={this.onClickDeleteItemFn}>
                        <Icon name="delete"/>
                    </Button>
                </div>


            </div>
        );

    }
};

TodoItem.propTypes = {
    todo: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    editFunc: PropTypes.func.isRequired,
    deleteFunc: PropTypes.func.isRequired,
    completeFunc: PropTypes.func.isRequired
};