const axios = require('axios');
const time = require('./time');

function graphCall(query) {
  return axios.post(
    'https://api.github.com/graphql',
    { query },
    { headers: { Authorization: `bearer ${process.env.GITHUB_PR_TOKEN}` } }
  );
}

exports.getPastWeekData = function getPastWeekData() {
  const query = `
    query {
      repositoryOwner(login: "versus-systems") {
        Umbrella: repository(name: "versus_umbrella") {
          ...pullRequests
        }
        SDK: repository(name: "sdk-unity") {
          ...pullRequests
        }
      }
    }

    fragment pullRequests on Repository {
      pullRequests(
        last: 50,
        states: [CLOSED, MERGED],
        orderBy: { field: UPDATED_AT, direction: ASC }
      ) {
        edges {
          node {
            title
            number
            createdAt
            closedAt
          }
        }
      }
    }
  `;

  return graphCall(query)
    .then((result) => {
      const repos = Object.keys(result.data.data.repositoryOwner);
      const pullRequests = repos.reduce((prs, repoName) => {
        const repo = result.data.data.repositoryOwner[repoName];
        return [...prs, ...repo.pullRequests.edges];
      }, []);

      const pastWeek = pullRequests.filter((pr) => {
        const lastWeek = Date.now() - 604800000; // one week;
        const closedDate = new Date(pr.node.closedAt).getTime();
        return closedDate > lastWeek;
      });

      const intervals = pastWeek.map(pr => {
        const createdAt = new Date(pr.node.createdAt).getTime();
        const closedAt = new Date(pr.node.closedAt).getTime();
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

exports.getPullRequests = function getPullRequests() {
  const query = `
    query {
      repositoryOwner(login: "versus-systems") {
        Umbrella: repository(name: "versus_umbrella") {
          ...pullRequests
        }
        SDK: repository(name: "sdk-unity") {
          ...pullRequests
        }
      }
    }

    fragment pullRequests on Repository {
      pullRequests(last: 50, states: [OPEN], orderBy: { field: UPDATED_AT, direction: ASC }) {
        edges {
          node {
            title
            url
            id
            number
            createdAt
            repository {
              nameWithOwner
              url
              id
            }
            author {
              login
              avatarUrl
              url
            }
            commits(last: 1) {
              nodes {
                commit {
                  status {
                    state
                  }
                }
              }
            }
            comments {
              totalCount
            }
            approvals: reviews(first:30, states: [APPROVED]) {
              totalCount
            }
          }
        }
      }
    }
  `;

  return graphCall(query)
    .then((result) => {
      const repos = Object.keys(result.data.data.repositoryOwner);
      const pullRequests = repos.reduce((prs, repoName) => {
        const repo = result.data.data.repositoryOwner[repoName];
        return [...prs, ...repo.pullRequests.edges];
      }, [])
      .map((pr) => pr.node);

      return pullRequests;
    });
};
