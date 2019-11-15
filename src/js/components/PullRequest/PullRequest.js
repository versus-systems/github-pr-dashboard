import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Wrapper, PullRequest, Info, Title, Repo } from './styles';

const PR = ({ pullRequest }) => {
  if (pullRequest.approvals >= 2) {
    return null;
  }

  const daysPast = moment().diff(pullRequest.createdAt, 'days');
  const borderColor = daysPast > 1 ? '#d0021b' : '#1d202e';
  const shadowStyle = { border: `4px solid ${borderColor}` };

  return (
    <Wrapper>
      <PullRequest style={shadowStyle}>
        <Info>
          <Title>
            {pullRequest.title}
          </Title>
          <Repo>
            {pullRequest.repository.name}
          </Repo>
        </Info>
      </PullRequest>
    </Wrapper>
  );
};

PR.propTypes = {
  pullRequest: PropTypes.object.isRequired
};

export default PR;
