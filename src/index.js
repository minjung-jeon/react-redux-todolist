import React from 'react';
import { render } from 'react-dom';

import App from "./app/App.js";


class Index {
    static main() {
        render(<App/>, document.querySelector('#container'));
        // Todo컴포넌트 호출, 랜더링해서 보여줄 DOM의 위치
    }
}

Index.main();
