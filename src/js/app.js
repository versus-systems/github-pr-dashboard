import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

import Application from './components/Application';

import '../css/main.css';

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path="/" component={Application} />
    </Switch>
  </Router>,
  document.getElementById('app')
);
