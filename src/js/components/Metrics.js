import React from 'react';
import axios from 'axios';
import BugChart from './BugChart';
import Gauge from './Gauge';
import Card from './Card';
import { Row, Column, Description } from './styles';

class Metrics extends React.Component {
  state = {
    bugsFixed: null,
    bugsCreated: null,
    leadTime: { days: 0, hours: 0 },
    cycleTime: { days: 0, hours: 0 },
  }

  componentDidMount() {
    axios.get(`/bugsFixed?token=${localStorage.getItem('token')}`).then((response) => {
      this.setState({ bugsFixed: response.data.count });
    });

    axios.get(`/bugsCreated?token=${localStorage.getItem('token')}`).then((response) => {
      this.setState({ bugsCreated: response.data.count });
    });

    axios.get(`/leadTime?token=${localStorage.getItem('token')}`).then((response) => {
      this.setState({
        leadTime: response.data.leadTime,
        cycleTime: response.data.cycleTime,
      });
    });
  }

  render() {
    const {
      bugsFixed, bugsCreated, leadTime, cycleTime
    } = this.state;

    return (
      <Column>
        <Row style={{ flexGrow: 2 }}>
          <Card>
            <Row>
              <Gauge
                id="lead-gauge"
                value={leadTime.days}
                min={0}
                max={20}
                type="month"
                description={value => (
                  <Description>
                    The average feature is in production value {value} after being requested.
                  </Description>
                )}
              />

              <Gauge
                id="cycle-gauge"
                value={cycleTime.days}
                min={0}
                max={10}
                type="sprint"
                description={value => (
                  <Description>
                    The average feature is in production value {value} after dev work begins.
                  </Description>
                )}
              />
            </Row>
          </Card>
        </Row>

        <Row style={{ flexGrow: 1 }}>
          <BugChart
            bugsFixed={bugsFixed}
            bugsCreated={bugsCreated}
          />
        </Row>

      </Column>
    );
  }
}

export default Metrics;
