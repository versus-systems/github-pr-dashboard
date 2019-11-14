import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Wrapper, PullRequest, Info, Title, Repo } from './styles';

export default class PR extends React.Component {
  render() {
    const pr = this.props.pullRequest;
    if (pr.approvals >= 2) {
      return null;
    }

    const daysPast = moment().diff(pr.createdAt, 'days');
    const borderColor = daysPast > 1 ? '#d0021b' : '#1d202e';
    let shadowStyle = { border: `4px solid ${borderColor}` };

    return (
      <Wrapper>
        <PullRequest style={shadowStyle}>
          <Info>
            <Title>
              {pr.title}
            </Title>
            <Repo>
              {pr.repository.name}
            </Repo>
          </Info>
        </PullRequest>
      </Wrapper>
    );
  }
}

PR.propTypes = {
  pullRequest: PropTypes.object.isRequired
};
