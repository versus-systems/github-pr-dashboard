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
