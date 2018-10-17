import React from 'react';
import '../../images/405.svg';

const StatsPanel = ({ timeToClose, mergedThisWeek, topCommenters }) => (
  <div className="stats-panel">
    <img src="images/405.svg" alt="Repository" />

    <hr />

    <h2>This Week</h2>

    <div className="stat-holder">
      <div className="stat-label">
        PRs Merged
      </div>
      <div className="stat">
        {mergedThisWeek}
      </div>
    </div>

    <div className="stat-holder">
      <div className="stat-label">
        Average Time to Close
      </div>
      <div className="stat">
        {timeToClose}
      </div>
    </div>

    <div className="stat-holder">
      <div className="stat-label">
        Top Commenters
      </div>
      <div className="stat">
        {topCommenters.map((commenter) => <div>{commenter}</div>)}
      </div>
    </div>
  </div>
);

StatsPanel.propTypes = {
  topCommenters: React.PropTypes.array.isRequired,
  pullRequests: React.PropTypes.array.isRequired,
  timeToClose: React.PropTypes.number.isRequired,
  mergedThisWeek: React.PropTypes.number.isRequired,
};

export default StatsPanel;
