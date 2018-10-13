import React from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PullRequest from './PullRequest';
import LoadingIndicator from './LoadingIndicator';
import ErrorMessage from './ErrorMessage';
import StatsPanel from './StatsPanel';
import Login from './Login';
import { loadPullRequests } from '../actions';

class Main extends React.Component {
  componentDidMount() {
    if (this.props.loggedIn) {
      this.props.actions.loadPullRequests(true);
    }
  }

  renderLoading() {
    if (this.props.loading) {
      return (
        <LoadingIndicator />
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
          <CSSTransitionGroup
            transitionName="pr"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={800}
          >
            {pullRequests.map(pr =>
              <div key={pr.id}>
                <PullRequest key={pr.id} pullRequest={pr} />
              </div>
            )}
          </CSSTransitionGroup>
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
  actions: React.PropTypes.object.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ loadPullRequests }, dispatch),
});

export default connect(state => state, mapDispatchToProps)(Main);
