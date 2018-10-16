import React from 'react';
import '../../images/logo.png';

const StatsPanel = ({ pullRequests, timeToClose, mergedThisWeek }) => (
  <div className="stats-panel">
    <img src="images/logo.png" alt="Repository" />

    <div className="stat-holder">
      <div className="stat">
        {pullRequests}
      </div>
      <div className="stat-label">
        Open Pull Requests
      </div>
    </div>

    <div className="stat-holder">
      <div className="stat">
        {mergedThisWeek}
      </div>
      <div className="stat-label">
        Merged This Week
      </div>
    </div>

    <div className="stat-holder">
      <div className="stat">
        {timeToClose}
      </div>
      <div className="stat-label">
        Average Time to Close (past week)
      </div>
    </div>
  </div>
);

StatsPanel.propTypes = {
  pullRequests: React.PropTypes.array.isRequired,
  timeToClose: React.PropTypes.number.isRequired,
  mergedThisWeek: React.PropTypes.number.isRequired,
};

export default StatsPanel;
