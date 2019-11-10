import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import BugChart from './BugChart';
import Gauge from './Gauge';
import Card from './Card';
import Counts from './Counts';
import { Value, getContentSize } from './Card/styles';
import { Row, Column, Description } from './styles';

import rocket from '../../images/rocket.png';

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
  }

  render() {
    const { bugsFixed, bugsCreated, leadTime, cycleTime } = this.state;
    const { height, width } = getContentSize();

    return (
      <Column style={{ width: '100%' }}>
        <Card>
          <Row>
            <Gauge
              id="lead-gauge"
              value={leadTime.days}
              min={0}
              max={20}
              type="month"
              description={(value) =>
                <Description>
                  The average feature is in production value {value} after being requested.
                </Description>
              }
            />

            <Gauge
              id="cycle-gauge"
              value={cycleTime.days}
              min={0}
              max={10}
              type="sprint"
              description={(value) =>
                <Description>
                  The average feature is in production value {value} after dev work begins.
                </Description>
              }
            />
          </Row>
        </Card>

        <Row>
          <Card id="bugs">
            <Row>
              <BugChart
                bugsFixed={bugsFixed}
                bugsCreated={bugsCreated}
                height={height}
                width={width}
              />

              <Description>
                In the past week, {bugsFixed} bugs were fixed and {bugsCreated} new bugs were filed.
              </Description>
            </Row>
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
