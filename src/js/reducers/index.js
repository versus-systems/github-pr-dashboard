import { ActionTypes } from '../actions';

export function loadingReducer(state = false, action) {
  switch (action.type) {
    case ActionTypes.START_LOADING:
      return true;
    case ActionTypes.ADD_PULL_REQUESTS:
      return false;
    default:
      return state;
  }
}

export function loggedInReducer(state = false, action) {
  switch (action.type) {
    case ActionTypes.LOGIN_SUCCESS:
      return true;
    default:
      return state;
  }
}

export function titleReducer(state = '', action) {
  switch (action.type) {
    case ActionTypes.SET_TITLE:
      return action.title;
    default:
      return state;
  }
}

export function timeToCloseReducer(state = '', action) {
  switch (action.type) {
    case ActionTypes.TIME_TO_CLOSE:
      return action.timeToClose;
    default:
      return state;
  }
}

export function reposReducer(state = [], action) {
  switch (action.type) {
    case ActionTypes.SET_REPOS:
      return action.repos;
    default:
      return state;
  }
}

function sortPullRequests(pullRequests) {
  const orderKey = 'created';

  return [...pullRequests].sort((a, b) => {
    if (a[orderKey] < b[orderKey]) {
      return -1;
    }
    if (a[orderKey] > b[orderKey]) {
      return 1;
    }

    return 0;
  });
}

export function pullRequestsReducer(state = [], action) {
  switch (action.type) {
    case ActionTypes.ADD_PULL_REQUESTS:
      return sortPullRequests(action.pullRequests);

    case ActionTypes.SORT:
      return sortPullRequests(state);

    case ActionTypes.UPDATE_PULL_REQUEST:
      return state.map(pullRequest => {
        if (pullRequest.id === action.pullRequest.id) {
          return Object.assign(
            {},
            pullRequest,
            action.pullRequest
          );
        }

        return pullRequest;
      });
    default:
      return state;
  }
}

export function failedReposReducer(state = [], action) {
  switch (action.type) {
    case ActionTypes.SET_FAILED_REPOS:
      return action.failedRepos;
    default:
      return state;
  }
}

export function errorReducer(state = '', action) {
  switch (action.type) {
    case ActionTypes.SET_ERROR:
      return action.error;
    default:
      return state;
  }
}
