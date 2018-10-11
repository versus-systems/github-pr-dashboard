const graph = require('./graphQL');

function getPullRequests() {
  return graph.getPullRequests();
}

exports.getPastWeekData = function getPastWeekData() {
  return graph.getPastWeekData();
};

exports.loadPullRequests = function loadPullRequests() {
  return getPullRequests();
};
