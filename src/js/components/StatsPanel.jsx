import React from 'react';
import PropTypes from 'prop-types';
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
  topCommenters: PropTypes.array.isRequired,
  pullRequests: PropTypes.array.isRequired,
  timeToClose: PropTypes.number.isRequired,
  mergedThisWeek: PropTypes.number.isRequired,
};

export default StatsPanel;
