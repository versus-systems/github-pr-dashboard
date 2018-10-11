const axios = require('axios');
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
  .map((pr) => pr.node);
}

exports.getPastWeekData = function getPastWeekData() {
  return graphCall(queries.closedPullRequests)
    .then((result) => {
      const pullRequests = extractPullRequests(result);

      const pastWeek = pullRequests.filter((pr) => {
        const lastWeek = Date.now() - 604800000; // one week;
        const closedDate = new Date(pr.closedAt).getTime();
        return closedDate > lastWeek;
      });

      const intervals = pastWeek.map(pr => {
        const createdAt = new Date(pr.createdAt).getTime();
        const closedAt = new Date(pr.closedAt).getTime();
        return closedAt - createdAt;
      });

      const sum = intervals.reduce((a, b) => a + b);
      const average = sum / pastWeek.length;

      return {
        merged: pastWeek.length,
        averageTime: time.millisecondsToStr(average),
      };
    });
};

exports.loadPullRequests = function loadPullRequests() {
  return graphCall(queries.openPullRequests)
    .then((result) => extractPullRequests(result))
    .then((pullRequests) =>
      pullRequests.map(pr => {
        const status = pr.commits.nodes[0].commit.status.state.toLowerCase();

        return {
          ...pr,
          positiveComments: pr.approvals.totalCount,
          status: {
            state: status,
            description: status
          },
          unmergeable: pr.title.toLowerCase().includes('wip'),
          mergeable: status === 'success' && pr.approvals.totalCount >= 2,
        };
      })
    );
};
