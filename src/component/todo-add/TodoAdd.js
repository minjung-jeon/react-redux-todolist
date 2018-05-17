import React, {Component} from "react";
import PropTypes from "prop-types";

export default class TodoAdd extends Component {
    constructor(props) {
        super(props);

        this.onClickAddButtonFn = this.onClickAddButton.bind(this);
        this.onHandleKeyUpFn = this.onHandleKeyUp.bind(this);
    }

    onClickAddButton(event) {
        let content = event.target.value;

        if (this.checkInputValidation(content) === true) {
            this.props.handleAddedDataFn(content);
            this.clearInput();
        }
    }

    onHandleKeyUp(event){
        if (event.keyCode === 27) {
            this.clearInput();
        } else if (event.keyCode === 13){
            this.onClickAddButtonFn(event);
        }
    }

    clearInput(){
        this.contentInput.value = "";
    }

    checkInputValidation(content) {
        let regexp = /[\#$<>\=_]/gi;

        if (content === '') {
            return false;
        }

        if (regexp.test(content)) {
            return false;
        } else {
            return true;
        }
    }

    render() {
        return (
            <div className="task-form">
                <input
                    type="text"
                    autoFocus
                    className="task-form__input"
                    placeholder="할 일을 입력해주세요"
                    ref={e => this.contentInput = e}
                    onKeyUp={this.onHandleKeyUpFn}
                />
            </div>
        );
    }
};

TodoAdd.propTypes = {
    handleAddedDataFn: PropTypes.func.isRequired
};
