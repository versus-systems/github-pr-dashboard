const time = require('./time');

exports.closedPullRequests = `
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

exports.openPullRequests = `
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

exports.recentPullRequests = () => {
  const date = time.oneWeekAgo();

  return (`
    query {
      search(query: "org:versus-systems type:pr updated:>${date}", type: ISSUE, first: 100) {
        issueCount
        edges {
          node {
            ... on PullRequest {
              url
              reviews(first:100) {
                edges {
                  node {
                    createdAt
                    author {
                      login
                    }
                    state
                    body
                    comments {
                      totalCount
                    }
                  }
                }
              }
              comments(first: 100) {
                edges {
                  node {
                    createdAt
                    author {
                      login
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `);
};

exports.team = `
  query {
    organization(login: "versus-systems") {
      members(first: 100) {
        edges {
          node {
            name
            id
            login
            url
          }
        }
      }
    }
  }
`;

exports.teamMember = (login) => {
  const date = time.threeMonthsAgo();

  return (`
    query {
      requested: search(query: "org:versus-systems type:pr review-requested:${login} created:>${date}", type: ISSUE, first: 10) {
        issueCount
        pageInfo {
          endCursor
          startCursor
        }
        edges {
          node {
            ... on PullRequest {
              repository {
                nameWithOwner
              }
              createdAt
              number
              url
            }
          }
        }
      }

      reviewed: search(query: "org:versus-systems type:pr reviewed-by:${login} created:>${date}", type: ISSUE, first: 10) {
        issueCount
        pageInfo {
          endCursor
          startCursor
        }
        edges {
          node {
            ... on PullRequest {
              repository {
                nameWithOwner
              }
              createdAt
              number
              url
            }
          }
        }
      }
    }
  `);
};
