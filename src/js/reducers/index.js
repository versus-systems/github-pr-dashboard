import { ActionTypes } from '../actions';

function sortPullRequests(pullRequests) {
  const orderKey = 'createdAt';

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

export function pullRequestsReducer(state = [], action) { //eslint-disable-line
  switch (action.type) {
    case ActionTypes.ADD_PULL_REQUESTS:
      return sortPullRequests(action.pullRequests);

    case ActionTypes.SORT:
      return sortPullRequests(state);

    case ActionTypes.UPDATE_PULL_REQUEST:
      return state.map((pullRequest) => {
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
