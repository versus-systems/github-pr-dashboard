import React from 'react';
import PropTypes from 'prop-types';
import { VictoryPie } from 'victory';
import Gauge from 'react-svg-gauge';
import axios from 'axios';
import Card from './Card';
import Metric from './Metric';
import { Row, Column } from './styles';

class Metrics extends React.Component {
  constructor() {
    super();

    this.state = {
      bugsFixed: null,
      bugsCreated: null,
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
  }

  render() {
    const { bugsFixed, bugsCreated, leadTime, cycleTime } = this.state;

    return (
      <Column style={{ width: '100%' }}>
        <Row>
          <Card title="Recent Deployments" box>
            <Metric currentValue={789} />
          </Card>

          <Card title="Bugs" box>
            <VictoryPie
              style={{ marginTop: -34 }}
              innerRadius={50}
              colorScale={['green', 'red']}
              data={[
                { x: 'Fixed', y: bugsFixed, color: 'green' },
                { x: 'Created', y: bugsCreated, color: 'red' },
              ]}
              width={(window.innerWidth / 4) - 30}
              height={(window.innerHeight / 2) - 60}
            />
          </Card>
        </Row>

        <Row>
          <Card title="Lead Time" box>
            <Gauge
              value={leadTime.days}
              min={0}
              max={15}
              label=""
              valueFormatter={val => `${val} days`}
              minMaxLabelStyle={{ display: 'none' }}
              valueLabelStyle={{ fontSize: '30px' }}
              width={(window.innerWidth / 4) - 30}
              height={(window.innerHeight / 2) - 60}
            />
          </Card>

          <Card title="Cycle Time" box>
            <Gauge
              value={cycleTime.days}
              min={0}
              max={3}
              label=""
              valueFormatter={val => `${val} days`}
              minMaxLabelStyle={{ display: 'none' }}
              valueLabelStyle={{ fontSize: '30px' }}
              width={(window.innerWidth / 4) - 30}
              height={(window.innerHeight / 2) - 60}
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
