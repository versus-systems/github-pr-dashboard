import React from 'react';
import axios from 'axios';
import { FETCH_INTERVAL } from 'config';
import Gauge from 'components/Gauge';
import Card from 'components/Card';
import { Row, Description } from 'styles';

class Latency extends React.Component {
  state = {
    leadTime: { days: 0, hours: 0 },
    cycleTime: { days: 0, hours: 0 },
  }

  componentDidMount() {
    this.getLatency();
  }

  getLatency = () => {
    axios.get(`/leadTime?token=${localStorage.getItem('token')}`).then((response) => {
      this.setState({
        leadTime: response.data.leadTime,
        cycleTime: response.data.cycleTime,
      });
    });

    setTimeout(this.getLatency, FETCH_INTERVAL);
  }

  render() {
    const { leadTime, cycleTime } = this.state;

    return (
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
    );
  }
}

export default Latency;
