import React from 'react';
import ReactDOM from 'react-dom';
// import { Router, Route, hashHistory, IndexRoute, Link } from 'react-router';
import {BrowserRouter as Router, Route, NavLink} from 'react-router-dom';

import App from './App';
// import * as serviceWorker from './serviceWorker';

const supportsHistory = 'pushState' in window.history;

ReactDOM.render(
    <Router forceRefresh={!supportsHistory}>
        <App/>
    </Router>, 
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
