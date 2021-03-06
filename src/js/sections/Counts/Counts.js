import React from 'react';
import axios from 'axios';
import { FETCH_INTERVAL } from 'config';
import { Row, Column } from 'styles';
import Card from 'components/Card';
import { Metric, Count, Label, Icon } from './styles';

import rocket from '../../../images/rocket.svg';
import stop from '../../../images/stop.svg';

class Metrics extends React.Component {
  state = {
    deployments: 0,
    blockers: 0,
  }

  componentDidMount() {
    this.getCounts();
  }

  getCounts = () => {
    axios.get(`/recentDeployments?token=${localStorage.getItem('token')}`).then((response) => {
      this.setState({ deployments: response.data.deployments.length });
    });

    axios.get(`/blockingStories?token=${localStorage.getItem('token')}`).then((response) => {
      this.setState({ blockers: response.data.stories.length });
    });

    setTimeout(this.getCounts, FETCH_INTERVAL);
  }

  render() {
    const { deployments, blockers } = this.state;

    return (
      <Card basis={200}>
        <Row style={{ flexGrow: 1, justifyContent: 'space-evenly' }}>
          <Metric>
            <Icon src={rocket} role="presentation" />

            <Column>
              <Count>
                {deployments}
              </Count>
              <Label>
                Recent Deployments
              </Label>
            </Column>
          </Metric>

          <Metric>
            <Icon src={stop} role="presentation" />

            <Column>
              <Count>
                {blockers}
              </Count>
              <Label>
                Blocking Issues
              </Label>
            </Column>
          </Metric>
        </Row>
      </Card>
    );
  }
}

export default Metrics;
