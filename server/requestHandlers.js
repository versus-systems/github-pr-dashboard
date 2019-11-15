const mongoose = require('mongoose');
const configManager = require('./configManager');
const githubService = require('./githubService');
const clubhouseService = require('./clubhouseService');
const Deployment = require('./schemas/deploymentSchema');

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
mongoose.connection.on('error', console.error.bind(console, 'Mongo connection error:')); // eslint-disable-line
mongoose.connection.once('open', () => console.log('Mongo connected!')); // eslint-disable-line

exports.login = function login(req, res) {
  if (req.body.password === process.env.LOGIN_PASSWORD) {
    res.status(200).json({ token: process.env.LOGIN_PASSWORD });
  } else {
    res.status(500).json(false);
  }
};

exports.getPullRequests = function getPullRequests(req, res) {
  const config = configManager.getConfig();
  githubService.loadPullRequests().then((prs) => {
    githubService.getPastWeekData().then(({ merged, averageTime }) => {
      githubService.loadTopCommenters().then((commenters) => {
        res.status(200).json({
          pullRequests: prs,
          timeToClose: averageTime,
          mergedThisWeek: merged,
          repos: config.repos,
          topCommenters: commenters,
        });
      });
    });
  }).catch((error) => {
    res.status(500).json({
      error: `Failed to load pull requests: ${error.message}`
    });
  });
};

exports.getTeam = function getTeam(req, res) {
  githubService.loadTeam().then((team) => {
    res.status(200).json({ team });
  }).catch((error) => {
    res.status(500).json({
      error: `Failed to load team: ${error.message}`
    });
  });
};

exports.getTeamMemberStats = function getTeamMemberStats(req, res) {
  githubService.loadTeamMemberStats(req.query.id).then((stats) => {
    res.status(200).json({ stats });
  }).catch((error) => {
    res.status(500).json({
      error: `Failed to load team member: ${error.message}`
    });
  });
};

exports.getBugsFixed = function getBugsFixed(req, res) {
  clubhouseService.getBugsFixed().then((count) => {
    res.status(200).json({ count });
  }).catch((error) => {
    res.status(500).json({
      error: `Failed to load fixed count: ${error.message}`
    });
  });
};

exports.getBugsCreated = function getBugsCreated(req, res) {
  clubhouseService.getBugsCreated().then((count) => {
    res.status(200).json({ count });
  }).catch((error) => {
    res.status(500).json({
      error: `Failed to load bugs created count: ${error.message}`
    });
  });
};

exports.getBlockingStories = function getBlockingStories(req, res) {
  clubhouseService.getBlockingStories().then((stories) => {
    res.status(200).json({ stories });
  }).catch((error) => {
    res.status(500).json({
      error: `Failed to load blocking stories: ${error.message}`
    });
  });
};

exports.getLeadTime = function getLeadTime(req, res) {
  clubhouseService.getLeadTime().then((leadTimes) => {
    res.status(200).json(leadTimes);
  }).catch((error) => {
    res.status(500).json({
      error: `Failed to load lead time: ${error.message}`
    });
  });
};

exports.getRecentDeployments = function getRecentDeployments(req, res) {
  Deployment.recent().then((deployments) => {
    res.status(200).json({ deployments });
  }).catch((error) => {
    res.status(500).json({
      error: `Failed to load lead time: ${error.message}`
    });
  });
};
