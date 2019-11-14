import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
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
      return null;
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

        <h3>Skipped (last 3 months): {teamMember.stats.requested.issueCount}</h3>
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
  loggedIn: PropTypes.bool.isRequired,
  teamMember: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  actions: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ loadTeamMember }, dispatch),
});

export default connect(state => state, mapDispatchToProps)(TeamMember);
