import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import LoadingIndicator from '../components/LoadingIndicator';
import Login from '../components/Login';
import { loadTeam } from '../actions';

class Team extends React.Component {
  componentDidMount() {
    if (this.props.loggedIn) {
      this.props.actions.loadTeam();
    }
  }

  renderTeamMember(member) {
    if (member.node.name) {
      return (
        <li>
          <Link key={member.node.login} to={`/team/${member.node.login}`}>
            {member.node.login} ({member.node.name})
          </Link>
        </li>
      );
    }

    return (
      <li>
        <Link key={member.node.login} to={`/team/${member.node.login}`}>
          {member.node.login}
        </Link>
      </li>
    );
  }

  render() {
    const { loggedIn, loading, team } = this.props;

    if (!loggedIn) {
      return <Login {...this.props} />;
    }

    if (loading) {
      return (
        <LoadingIndicator />
      );
    }

    return (
      <div className="center-container">
        <h1>Team</h1>
        <ul>
        {team && team
          .sort((m1, m2) => (m1.node.login.toLowerCase() < m2.node.login.toLowerCase() ? -1 : 1))
          .map((member) => this.renderTeamMember(member))
        }
        </ul>
      </div>
    );
  }
}

Team.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  team: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  actions: PropTypes.object.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ loadTeam }, dispatch),
});

export default connect(state => state, mapDispatchToProps)(Team);
