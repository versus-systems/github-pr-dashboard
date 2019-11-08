import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import BugChart from './BugChart';
import Gauge from './Gauge';
import Card from './Card';
import { Value, getContentSize } from './Card/styles';
import { Row, Column } from './styles';

class Metrics extends React.Component {
  constructor() {
    super();

    this.state = {
      bugsFixed: null,
      bugsCreated: null,
      deployments: 0,
      leadTime: { days: 0, hours: 0 },
      cycleTime: { days: 0, hours: 0 },
    };
  }

  componentDidMount() {
    axios.get(`/bugsFixed?token=${localStorage.getItem('token')}`).then(response => {
      this.setState({ bugsFixed: response.data.count });
    });

    axios.get(`/bugsCreated?token=${localStorage.getItem('token')}`).then(response => {
      this.setState({ bugsCreated: response.data.count });
    });

    axios.get(`/leadTime?token=${localStorage.getItem('token')}`).then(response => {
      this.setState({
        leadTime: response.data.leadTime,
        cycleTime: response.data.cycleTime,
      });
    });

    axios.get(`/recentDeployments?token=${localStorage.getItem('token')}`).then(response => {
      this.setState({ deployments: response.data.deployments.length });
    });
  }

  render() {
    const { bugsFixed, bugsCreated, leadTime, cycleTime, deployments } = this.state;
    const { height, width } = getContentSize();

    return (
      <Column style={{ width: '100%' }}>
        <Row>
          <Card title="Recent Deployments" box>
            <Value>
              {deployments}
            </Value>
          </Card>

          <Card id="bugs" title="Bugs" box>
            <BugChart
              bugsFixed={bugsFixed}
              bugsCreated={bugsCreated}
              height={height}
              width={width}
            />
          </Card>
        </Row>

        <Row>
          <Card title="Lead Time" box>
            <Gauge
              value={leadTime.days}
              min={0}
              max={15}
              height={height}
              width={width}
            />
          </Card>

          <Card title="Cycle Time" box>
            <Gauge
              value={cycleTime.days}
              min={0}
              max={3}
              height={height}
              width={width}
            />
          </Card>
        </Row>
      </Column>
    );
  }
}

Metrics.propTypes = {
  pullRequests: PropTypes.array,
};

export default Metrics;
