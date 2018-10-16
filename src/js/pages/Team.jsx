import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
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
        <div>
          {member.node.login} ({member.node.name})
        </div>
      );
    }

    return (
      <div>
        {member.node.login}
      </div>
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
      <div className="container">
        <h1>Teammm</h1>
        {team && team.map((member) => this.renderTeamMember(member))}
      </div>
    );
  }
}

Team.propTypes = {
  loggedIn: React.PropTypes.bool.isRequired,
  team: React.PropTypes.bool.isRequired,
  loading: React.PropTypes.bool.isRequired,
  actions: React.PropTypes.object.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ loadTeam }, dispatch),
});

export default connect(state => state, mapDispatchToProps)(Team);
