import React, {Component} from "react";

import './Header.scss';

export default class Header extends Component {
    constructor() {
        super();
    }

    render() {
        return(
            <header className="header">
                <div className="g-row">
                    <div className="g-col">
                        <h1 className="header__title">TODO LIST(REACT)</h1>

                        <ul className="header__actions">
                            <li>
                                <a className="link link--github" href="">
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </header>
        );
    }
}