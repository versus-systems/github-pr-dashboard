const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
const requestHandlers = require('./requestHandlers');

function isAuthenticated(req, res, next) {
  if (req.query.token === process.env.LOGIN_PASSWORD) {
    next();
    return;
  }

  res.status(401).json({ Authenticated: false });
}

const app = express();
app.use(favicon(path.join(__dirname, '..', 'src', 'images', 'favicon.png')));

app.use(express.static('dist'));
app.use(bodyParser.json());

app.post('/login', requestHandlers.login);
app.get('/pulls', isAuthenticated, requestHandlers.getPullRequests);
app.get('/teamMembers', isAuthenticated, requestHandlers.getTeam);
app.get('/teamMember', isAuthenticated, requestHandlers.getTeamMemberStats);
app.get('*', (req, res) => {
  res.sendFile(path.resolve('dist', 'index.html'));
});

const port = process.env.PORT || 8080;
console.log('GitHub PR Dashboard');
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
