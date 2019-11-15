import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

import Application from './components/Application';
import configureStore from './store';

import '../css/main.css';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path="/" component={Application} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('app')
);
