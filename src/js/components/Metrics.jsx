import React from 'react';
// import PropTypes from 'prop-types';
import axios from 'axios';
import Card from './Card';
import Metric from './Metric';

class Main extends React.Component {
  constructor() {
    super();

    this.state = {
      bugsFixed: null,
      bugsCreated: null,
      leadTime: null,
      blockingStories: [],
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
        leadTime: `${response.data.count.days} days ${response.data.count.hours} hours`
      });
    });

    axios.get(`/blockingStories?token=${localStorage.getItem('token')}`).then(response => {
      this.setState({ blockingStories: response });
    });
  }

  render() {
    const { bugsFixed, bugsCreated, leadTime, blockingStories } = this.state;

    return (
      <div>
        <Card title="Bugs Fixed">
          <Metric currentValue={bugsFixed} />
        </Card>

        <Card title="Bugs Fixed">
          <Metric currentValue={bugsCreated} benchmark={30} />
        </Card>

        <Card title="Lead Time">
          <Metric currentValue={leadTime} goal={"3 days"} />
        </Card>

        <Card title="Blocking Stories">
          <Metric currentValue={blockingStories.length} />
        </Card>
      </div>
    );
  }
}

export default Main;
