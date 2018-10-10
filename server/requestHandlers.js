const configManager = require('./configManager');
const githubService = require('./githubService');

exports.login = function login(req, res) {
  if (req.body.password === process.env.LOGIN_PASSWORD) {
    res.status(200).json(true);
  } else {
    res.status(500).json(false);
  }
};

exports.getPullRequests = function getPullRequests(req, res) {
  const config = configManager.getConfig();
  githubService.loadPullRequests().then(prs => {
    githubService.getPastWeekAverage().then((average) => {
      res.status(200).json({
        pullRequests: prs,
        timeToClose: average,
        repos: config.repos,
        title: config.title
      });
    });
  }).catch(error => {
    res.status(500).json({
      error: `Failed to load pull requests: ${error.message}`
    });
  });
};

exports.getConfig = function getConfig(req, res) {
  const config = configManager.getConfig();
  res.status(200).json(config);
};

exports.updateConfig = function updateConfig(req, res) {
  configManager.updateConfig(req.body);
  res.status(200).json('updated');
};

exports.repoExists = function getConfig(req, res) {
  githubService.getRepo(req.query.owner, req.query.repo).then(() => {
    res.status(200).json(true);
  }).catch(() => {
    res.status(404).json(false);
  });
};

exports.getPastWeekAverage = function getPastWeekAverage(req, res) {
  githubService.getPastWeekAverage().then((average) => {
    res.status(200).json({ average });
  }).catch(() => {
    res.status(404).json({ success: false });
  });
};
