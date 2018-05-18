import React, {Component} from "react";

import Todo from "../container/Todo";
import Header from "../component/header/Header";

import './App.scss';


export default class App extends Component {
    constructor(){
        super();
    }

    render() {
        return(
            <div>
                <Header/>
                <Todo/>
            </div>
        );
    }
}
