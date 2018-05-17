import React, {Component} from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Button from '../button/button.js';
import Icon from '../icon/icon.js';

export default class TodoItem extends Component {
    constructor(props) {
        super(props);

        this.onSavekEditItemFn = this.onSaveEditItem.bind(this);
        this.onClickDeleteItemFn = this.onClickDeleteItem.bind(this);
        this.onHandleKeyUpFn = this.onHandleKeyUp.bind(this);
        this.onStopEditingFn = this.onStopEditing.bind(this);
        this.onEditFn = this.onEdit.bind(this);

        this.state = {
            isEdit: false
        }
    }

    shouldComponentUpdate(nextProps, nextState){
        return (nextProps.todo.id !== this.props.todo.id) || this.state.isEdit !== nextState.isEdit;
    }

    onHandleKeyUp(event){
        if (event.keyCode === 13) {
            this.onSavekEditItemFn(event);
        } else if (event.keyCode === 27) {
            this.onStopEditingFn();
        }
    }

    onSaveEditItem(event) {
        this.props.selectFunc(this.props.index);

        if(this.state.isEdit === false){
            this.setState({isEdit : true});
        } else {
            const content = event.target.value;
            this.props.editFunc(this.props.todo.id, content);
            this.setState({isEdit : false});
        }
    }

    onClickDeleteItem() {
        this.props.selectFunc(this.props.index);
        this.props.deleteFunc(this.props.todo.id);
    }

    onStopEditing() {
        this.setState({isEdit: false});
    }

    onEdit() {
        this.setState({isEdit: true});
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
        console.log(editing);
        const task = this.props.todo;

        let containerClasses = classNames('task-item', {
            // 'task-item--completed': task.completed,
            'task-item--editing': editing
        });

        return (
            <div className={containerClasses}>
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
    selectFunc: PropTypes.func.isRequired
};