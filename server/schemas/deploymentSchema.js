const mongoose = require('mongoose');

const deploymentSchema = new mongoose.Schema({
  environment: String,
  version: String,
  date: { type: Date, default: Date.now },
});

deploymentSchema.statics.recent = function recent() {
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  const query = {
    environment: 'PROD',
    date: { $gte: oneWeekAgo },
  };

  return this.find(query, (err, deployments) => {
    if (err) {
      return console.log('Error fetching deployments:', err); // eslint-disable-line
    }

    return deployments.length;
  });
};

const Deployment = mongoose.model('Deployment', deploymentSchema);

module.exports = Deployment;
