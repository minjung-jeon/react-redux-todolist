import React, {Component} from "react";
import { connect } from 'react-redux';

import Todo from "../container/Todo";
import Header from "../component/header/Header";

import './App.scss';


export default class App extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return(
            <div>
                <Header/>
                <Todo store={this.props.store}/>
            </div>
        );
    }
}