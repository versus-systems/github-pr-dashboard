const axios = require('axios');

const configManager = require('./configManager');
const graph = require('./graphQL');

function apiCall(url, headers = {}) {
  const options = {
    headers,
    auth: {
      username: process.env.GITHUB_PR_TOKEN
    }
  };

  return axios.get(url, options);
}

function getPullRequests() {
  return graph.getPullRequests().then((pullRequests) =>
    pullRequests.map(pr => ({
      url: pr.url,
      id: pr.id,
      number: pr.number,
      title: pr.title,
      repo: pr.repository.nameWithOwner,
      repoUrl: pr.repository.url,
      repoId: pr.repository.id,
      positiveComments: pr.approvals.totalCount,
      user: {
        username: pr.author.login,
        profileUrl: pr.author.url,
        avatarUrl: pr.author.avatarUrl
      },
      created: pr.createdAt,
      updated: pr.updatedAt,
      comments_url: pr.comments_url,
      status: {
        state: pr.commits.nodes[0].commit.status.state.toLowerCase(),
        description: pr.commits.nodes[0].commit.status.state.toLowerCase()
      },
      unmergeable: pr.title.toLowerCase().includes('wip'),
      mergeable: pr.commits.nodes[0].commit.status.state.toLowerCase() === 'success' &&
        pr.approvals.totalCount >= 2,
    }))
  );
}

exports.getPastWeekData = function getPastWeekData() {
  return graph.getPastWeekData();
};

exports.getRepo = function getRepo(owner, name) {
  const config = configManager.getConfig();
  return apiCall(`${config.apiBaseUrl}/repos/${owner}/${name}`);
};

exports.loadPullRequests = function loadPullRequests() {
  return getPullRequests();
};
