import React from 'react';
import Metrics from './Metrics';
import Counts from './Counts';
import PullRequests from './PullRequests';
import { Row, Column, Wrapper, Header, Logo } from './styles';

import logo from '../../images/logo.svg';

const Dashboard = () => (
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
          <PullRequests />
        </Column>
      </Column>
    </Row>
  </Wrapper>
);

export default Dashboard;
