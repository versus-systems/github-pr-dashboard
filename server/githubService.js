/* eslint-disable no-console, no-shadow, no-unused-vars */

const axios = require('axios');
const moment = require('moment');
const queries = require('./queries');
const time = require('./time');

function graphCall(query) {
  return axios.post(
    'https://api.github.com/graphql',
    { query },
    { headers: { Authorization: `bearer ${process.env.GITHUB_PR_TOKEN}` } }
  );
}

function extractPullRequests(result) {
  const repos = Object.keys(result.data.data.repositoryOwner);
  return repos.reduce((prs, repoName) => {
    const repo = result.data.data.repositoryOwner[repoName];
    return [...prs, ...repo.pullRequests.edges];
  }, [])
    .map(pr => pr.node);
}

exports.loadPullRequests = function loadPullRequests() {
  return graphCall(queries.openPullRequests)
    .then(result => extractPullRequests(result))
    .then(pullRequests =>
      pullRequests.map((pr) => {
        const commitStatus = pr.commits.nodes[0].commit.status;
        const status = commitStatus ? commitStatus.state.toLowerCase() : '';

        return {
          ...pr,
          approvals: pr.approvals.totalCount,
          wip: pr.title.toLowerCase().includes('wip'),
          status: {
            state: status,
            description: status
          },
        };
      }).sort((pr1, pr2) => pr1.createdAt > pr2.createdAt)).catch(e => console.log(e));
};
