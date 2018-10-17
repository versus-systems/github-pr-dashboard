import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import {
  loadingReducer,
  reposReducer,
  titleReducer,
  pullRequestsReducer,
  failedReposReducer,
  errorReducer,
  loggedInReducer,
  timeToCloseReducer,
  mergedThisWeekReducer,
  teamReducer,
  teamMemberReducer,
  topCommentersReducer,
} from '../reducers';

export default function configureStore() {
  const reducer = combineReducers({
    loggedIn: loggedInReducer,
    pullRequests: pullRequestsReducer,
    repos: reposReducer,
    failedRepos: failedReposReducer,
    loading: loadingReducer,
    error: errorReducer,
    title: titleReducer,
    timeToClose: timeToCloseReducer,
    mergedThisWeek: mergedThisWeekReducer,
    team: teamReducer,
    teamMember: teamMemberReducer,
    topCommenters: topCommentersReducer,
  });

  return createStore(reducer, {}, compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));
}
