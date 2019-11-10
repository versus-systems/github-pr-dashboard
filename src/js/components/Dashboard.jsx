import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransitionGroup } from 'react-transition-group';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Card from './Card';
import PullRequest from './PullRequest';
import ErrorMessage from './ErrorMessage';
import Metrics from './Metrics';
import Counts from './Counts';
import Login from './Login';
import { Row, Column, Wrapper, Header } from './styles';
import { loadPullRequests } from '../actions';

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
      <Wrapper>
        <Column>
          <Header>
            VS Engineering
          </Header>

          <Row>
            <Row flex={1}>
              <Metrics />
            </Row>

            <Column flex={1}>
              <Counts />

              <Card title="Reviews Needed">
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
              </Card>
            </Column>
          </Row>
        </Column>
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
