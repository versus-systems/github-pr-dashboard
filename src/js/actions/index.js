import axios from 'axios';

export const ActionTypes = {
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_ERROR: 'LOGIN_ERROR',
  ADD_PULL_REQUESTS: 'ADD_PULL_REQUESTS',
  UPDATE_PULL_REQUEST: 'UPDATE_PULL_REQUEST',
  SET_FAILED_REPOS: 'SET_FAILED_REPOS',
  REFRESH: 'REFRESH',
  TIME_TO_CLOSE: 'TIME_TO_CLOSE',
  START_LOADING: 'START_LOADING',
  SET_ERROR: 'SET_ERROR',
  SET_REPOS: 'SET_REPOS',
  SET_TEAM: 'SET_TEAM',
  SET_TEAM_MEMBER: 'SET_TEAM_MEMBER',
  SET_MERGED_THIS_WEEK: 'SET_MERGED_THIS_WEEK',
  SET_TOP_COMMENTERS: 'SET_TOP_COMMENTERS',
  SORT: 'SORT'
};

export function addPullRequests(pullRequests, sortOptions) {
  return {
    type: ActionTypes.ADD_PULL_REQUESTS,
    pullRequests,
    sortOptions
  };
}

export function addFailedRepos(failedRepos) {
  return {
    type: ActionTypes.SET_FAILED_REPOS,
    failedRepos
  };
}

export function updatePullRequest(pullRequest) {
  return {
    type: ActionTypes.UPDATE_PULL_REQUEST,
    pullRequest
  };
}

export function refresh() {
  return {
    type: ActionTypes.REFRESH
  };
}

export function loadPullRequests(showLoading = false) {
  return (dispatch, getState) => {
    const { sortOptions } = getState();
    if (showLoading) {
      dispatch({ type: ActionTypes.START_LOADING });
    }

    return axios.get(`/pulls?token=${localStorage.getItem('token')}`).then((response) => {
      dispatch(addPullRequests(response.data.pullRequests, sortOptions));
      setTimeout(() => dispatch(loadPullRequests(false)), 10000);
    }).catch(() => {
      setTimeout(() => dispatch(loadPullRequests(false)), 10000);
    });
  };
}

export function sort({ sortByRepo, orderBy }) {
  return {
    type: ActionTypes.SORT,
    sortOptions: {
      sortByRepo,
      orderBy
    }
  };
}
