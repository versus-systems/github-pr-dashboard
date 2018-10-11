import React from 'react';
import { connect } from 'react-redux';
import PullRequest from './PullRequest';
import LoadingOverlay from './LoadingOverlay';
import ErrorMessage from './ErrorMessage';
import StatsPanel from './StatsPanel';
import Login from './Login';

class Main extends React.Component {

  renderLoading() {
    if (this.props.loading) {
      return (
        <LoadingOverlay />
      );
    }
    return <div></div>;
  }

  renderFailedRepos() {
    return (
      <div>
        {this.props.failedRepos.map(failedRepo =>
          <ErrorMessage
            key={failedRepo}
            message={`Failed to load pull request data for ${failedRepo}.`}
          />
        )}
      </div>
    );
  }

  renderBody() {
    const { error, pullRequests, timeToClose, mergedThisWeek } = this.props;

    if (error) {
      return <ErrorMessage message={this.props.error} />;
    }

    return (
      <div style={{ display: 'flex' }}>
        {this.renderFailedRepos()}
        {this.renderLoading()}
        <div className="stats-panel-holder">
          <StatsPanel
            pullRequests={pullRequests.length}
            timeToClose={timeToClose}
            mergedThisWeek={mergedThisWeek}
          />
        </div>
        <div style={{ flex: 1 }}>
          {pullRequests.map(pr =>
            <div key={pr.id}>
              <PullRequest key={pr.id} pullRequest={pr} />
            </div>
          )}
        </div>
      </div>
    );
  }

  render() {
    if (!this.props.loggedIn) {
      return <Login {...this.props} />;
    }

    return (
      <div className="container">
        {this.renderBody()}
      </div>
    );
  }
}

Main.propTypes = {
  loggedIn: React.PropTypes.bool.isRequired,
  loading: React.PropTypes.bool.isRequired,
  pullRequests: React.PropTypes.array.isRequired,
  repos: React.PropTypes.array.isRequired,
  title: React.PropTypes.string.isRequired,
  failedRepos: React.PropTypes.array.isRequired,
  error: React.PropTypes.string.isRequired,
  timeToClose: React.PropTypes.string.isRequired,
  mergedThisWeek: React.PropTypes.number.isRequired,
};

export default connect(state => state)(Main);
