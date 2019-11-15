import React from 'react';
import Latency from 'sections/Latency';
import Bugs from 'sections/Bugs';
import Counts from 'sections/Counts';
import PullRequests from 'sections/PullRequests';
import { Row, Column, Wrapper, Header, Logo } from 'styles';

import logo from '../../images/logo.svg';

const Dashboard = () => (
  <Wrapper id="dashboard">
    <Header>
      <Logo src={logo} />
    </Header>

    <Row style={{ flexGrow: 1, overflow: 'hidden' }}>
      <Row flex={2}>
        <Column>
          <Row style={{ flexGrow: 2 }}>
            <Latency />
          </Row>

          <Row style={{ flexGrow: 1 }}>
            <Bugs />
          </Row>

        </Column>
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
