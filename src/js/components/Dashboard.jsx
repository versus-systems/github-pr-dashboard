import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Card from './Card';
import PullRequest from './PullRequest';
import ErrorMessage from './ErrorMessage';
import Metrics from './Metrics';
import Counts from './Counts';
import Login from './Login';
import { Row, Column, Wrapper, Header, Logo } from './styles';
import { loadPullRequests } from '../actions';

import logo from '../../images/logo.svg';

class Main extends React.Component {
  componentDidMount() {
    if (this.props.loggedIn) {
      this.props.actions.loadPullRequests(true);
    }
  }

  render() {
    const {
      error,
      pullRequests,
      loggedIn,
    } = this.props;

    if (!loggedIn) {
      return <Login {...this.props} />;
    }

    if (error) {
      return <ErrorMessage message={this.props.error} />;
    }

    return (
      <Wrapper id="dashboard">
        <Header>
          <Logo src={logo} />
        </Header>

        <Row style={{ flexGrow: 1, overflow: 'hidden' }}>
          <Row flex={2}>
            <Metrics />
          </Row>

          <Column flex={3}>
            <Counts />

            <Column style={{ flexGrow: 1, overflow: 'hidden' }}>
              <Card title="Reviews Needed" hideOverflow>
                <Column style={{ alignSelf: 'stretch', width: '100%' }}>
                  {[...pullRequests].map(pr =>
                    <PullRequest key={pr.id + Math.random()} pullRequest={pr} />
                  )}
                </Column>
              </Card>
            </Column>
          </Column>
        </Row>
      </Wrapper>
    );
  }
}

Main.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  pullRequests: PropTypes.array.isRequired,
  error: PropTypes.string.isRequired,
  timeToClose: PropTypes.string.isRequired,
  actions: PropTypes.object.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ loadPullRequests }, dispatch),
});

export default connect(state => state, mapDispatchToProps)(Main);
