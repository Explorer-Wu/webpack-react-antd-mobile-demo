import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
  // HashRouter
} from 'react-router-dom';

import App from '../components/App';
// import NoMatch from '../views/Error/NoMatch'
const supportsHistory = 'pushState' in window.history;

const Routers = (
  <Router forceRefresh={!supportsHistory}>
    <Switch>
      <Route path="/views" component={App}/>
      {/*未找到路由*/}
      {/* <Route component={NoMatch} /> */}
      <Redirect to="/views/home" />
    </Switch>
  </Router>
);

export default Routers;