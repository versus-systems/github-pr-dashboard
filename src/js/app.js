import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

import Dashboard from './components/Dashboard';
import Team from './pages/Team';
import configureStore from './store';

import '../css/main.scss';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/team" component={Team} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('app')
);
