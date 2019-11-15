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

exports.getPastWeekData = function getPastWeekData() {
  return graphCall(queries.closedPullRequests)
    .then((result) => {
      const pullRequests = extractPullRequests(result);

      const pastWeek = pullRequests.filter((pr) => {
        const lastWeek = Date.now() - 604800000; // one week;
        const closedDate = new Date(pr.closedAt).getTime();
        return closedDate > lastWeek;
      });

      const intervals = pastWeek.map((pr) => {
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
      })).catch(e => console.log(e));
};

exports.loadTeam = function loadTeam() {
  return graphCall(queries.team)
    .then(result => result.data.data.organization.members.edges)
    .catch(e => console.log(e));
};

exports.loadTeamMemberStats = function loadTeamMemberStats(login) {
  return graphCall(queries.teamMember(login))
    .then(result => result.data.data)
    .catch(e => console.log(e));
};

exports.loadTopCommenters = function loadTopCommenters() {
  return graphCall(queries.recentPullRequests())
    .then(result => result.data.data)
    .then((data) => {
      const totals = {};
      const oneWeekAgo = moment().subtract(7, 'days');
      const flatData = data.search.edges.map(({ node }) => ({
        reviews: node.reviews.edges.map(({ node }) => node),
        comments: node.comments.edges.map(({ node }) => node),
        body: node.body,
        state: node.state,
        createdAt: node.createdAt,
      }));

      flatData.forEach((data) => {
        data
          .reviews
          .filter(({ createdAt }) => moment(createdAt).isAfter(oneWeekAgo))
          .forEach((review) => {
            const { login } = review.author;
            const decision = ['APPROVED', 'CHANGES_REQUESTED'].includes(review.state) ? 1 : 0;
            const initialComment = review.body.length ? 1 : 0;
            const additionalComments = review.comments.totalCount;
            const total = (decision + initialComment + additionalComments) || 1;

            totals[login] = totals[login] || 0;
            totals[login] += total;
          });

        data
          .comments
          .filter(({ createdAt }) => moment(createdAt).isAfter(oneWeekAgo))
          .forEach((comment) => {
            const { login } = comment.author;
            totals[login] = totals[login] || 0;
            totals[login] += 1;
          });
      });

      const totalsArray = Object.keys(totals)
        .map(key => [key, totals[key]])
        .sort(([name, total], [name2, total2]) => (total < total2 ? 1 : -1));
      return totalsArray;
    })
    .catch(e => console.log(e));
};
