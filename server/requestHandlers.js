const configManager = require('./configManager');
const githubService = require('./githubService');

exports.login = function login(req, res) {
  if (req.body.password === process.env.LOGIN_PASSWORD) {
    res.status(200).json({ token: process.env.LOGIN_PASSWORD });
  } else {
    res.status(500).json(false);
  }
};

exports.getPullRequests = function getPullRequests(req, res) {
  const config = configManager.getConfig();
  githubService.loadPullRequests().then(prs => {
    githubService.getPastWeekData().then(({ merged, averageTime }) => {
      res.status(200).json({
        pullRequests: prs,
        timeToClose: averageTime,
        mergedThisWeek: merged,
        repos: config.repos,
        title: 'The 405'
      });
    });
  }).catch(error => {
    res.status(500).json({
      error: `Failed to load pull requests: ${error.message}`
    });
  });
};
