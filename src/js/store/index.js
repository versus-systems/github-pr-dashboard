import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import {
  pullRequestsReducer,
  loggedInReducer,
} from '../reducers';

export default function configureStore() {
  const reducer = combineReducers({
    loggedIn: loggedInReducer,
    pullRequests: pullRequestsReducer
  });

  return createStore(reducer, {}, compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));
}
