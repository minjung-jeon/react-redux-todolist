import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import todoReducer from './reducer';

import App from "./app/App.js";

let store = createStore(todoReducer);

class Index {
    static main() {
        render(
            <Provider store={store}>
                <App/>
            </Provider>, document.querySelector('#container'));
        // Todo컴포넌트 호출, 랜더링해서 보여줄 DOM의 위치
    }
}

Index.main();
