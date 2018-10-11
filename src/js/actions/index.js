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
  SET_TITLE: 'SET_TITLE',
  SET_MERGED_THIS_WEEK: 'SET_MERGED_THIS_WEEK',
  SORT: 'SORT'
};

export function setError(error) {
  return {
    type: ActionTypes.SET_ERROR,
    error
  };
}

export function setRepos(repos) {
  return {
    type: ActionTypes.SET_REPOS,
    repos
  };
}

export function setTimeToClose(timeToClose) {
  return {
    type: ActionTypes.TIME_TO_CLOSE,
    timeToClose
  };
}

export function setTitle(title) {
  return {
    type: ActionTypes.SET_TITLE,
    title
  };
}

export function setMergedThisWeek(mergedThisWeek) {
  return {
    type: ActionTypes.SET_MERGED_THIS_WEEK,
    mergedThisWeek
  };
}

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

export function addFailedRepo(failedRepo) {
  return {
    type: ActionTypes.ADD_FAILED_REPO,
    failedRepo
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

    return axios.get('/pulls').then(response => {
      dispatch(addPullRequests(response.data.pullRequests, sortOptions));
      dispatch(setRepos(response.data.repos));
      dispatch(setTitle(response.data.title || 'Pull Requests'));
      dispatch(setTimeToClose(response.data.timeToClose));
      dispatch(setMergedThisWeek(response.data.mergedThisWeek));

      setTimeout(() => dispatch(loadPullRequests(false)), 60000);
    }).catch(() => {
      dispatch(setError('Failed to load pull requests. Double check that all your repos exist!'));
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

export function loginSuccess() {
  return {
    type: ActionTypes.LOGIN_SUCCESS
  };
}

export function login(password) {
  return (dispatch) =>
    axios.post('/login', { password }).then(() => {
      dispatch(loadPullRequests(true));
      dispatch(loginSuccess());
    }).catch(() => {
      alert("Login Failed") // eslint-disable-line
    });
}
