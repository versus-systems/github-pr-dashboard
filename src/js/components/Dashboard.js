import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Card from './Card';
import PullRequest from './PullRequest';
import Metrics from './Metrics';
import Counts from './Counts';
import { Row, Column, Wrapper, Header, Logo } from './styles';
import { loadPullRequests } from '../actions';

import logo from '../../images/logo.svg';

class Dashboard extends React.Component {
  componentDidMount() {
    this.props.actions.loadPullRequests(true);
  }

  render() {
    const { pullRequests } = this.props;

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
                  {pullRequests.map(pr =>
                    <PullRequest key={pr.id} pullRequest={pr} />)}
                </Column>
              </Card>
            </Column>
          </Column>
        </Row>
      </Wrapper>
    );
  }
}

Dashboard.propTypes = {
  pullRequests: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ loadPullRequests }, dispatch),
});

export default connect(state => state, mapDispatchToProps)(Dashboard);
