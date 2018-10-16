import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import LoadingIndicator from '../components/LoadingIndicator';
import Login from '../components/Login';
import { loadTeamMember } from '../actions';

class TeamMember extends React.Component {
  componentDidMount() {
    if (this.props.loggedIn) {
      this.props.actions.loadTeamMember(this.props.match.params.login);
    }
  }

  renderPullRequest(pr) {
    return (
      <li>
        <a key={pr.url} href={pr.url}>
          <span className="date">{moment(pr.createdAt).format(' MM/DD/YYYY')}</span> {pr.url}
        </a>
      </li>
    );
  }

  render() {
    const { loggedIn, loading, teamMember } = this.props;

    if (!loggedIn) {
      return <Login {...this.props} />;
    }

    if (loading || !teamMember.stats) {
      return (
        <LoadingIndicator />
      );
    }

    return (
      <div className="center-container">
        <h1>{this.props.match.params.login}</h1>

        <h3>Reviewed (last 3 months): {teamMember.stats.reviewed.issueCount}</h3>
        <h4>Last 10</h4>
        <ul>
          {
            teamMember.stats.reviewed.edges.map(({ node }) => (
              this.renderPullRequest(node)
            ))
          }
        </ul>

        <h3>Neglected (last 3 months): {teamMember.stats.requested.issueCount}</h3>
        <h4>Last 10</h4>
        <ul>
          {
            teamMember.stats.requested.edges.map(({ node }) => (
              this.renderPullRequest(node)
            ))
          }
        </ul>
      </div>
    );
  }
}

TeamMember.propTypes = {
  loggedIn: React.PropTypes.bool.isRequired,
  teamMember: React.PropTypes.object.isRequired,
  loading: React.PropTypes.bool.isRequired,
  actions: React.PropTypes.object.isRequired,
  match: React.PropTypes.object.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ loadTeamMember }, dispatch),
});

export default connect(state => state, mapDispatchToProps)(TeamMember);
