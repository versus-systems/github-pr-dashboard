import React from 'react';
import axios from 'axios';
import { FETCH_INTERVAL } from 'config';
import Card from 'components/Card';
import PullRequest from 'components/PullRequest';
import { Column } from 'styles';

class Dashboard extends React.Component {
  state = {
    pullRequests: [],
  }

  componentDidMount() {
    this.getPullRequests();
  }

  getPullRequests = () => {
    axios.get(`/pulls?token=${localStorage.getItem('token')}`).then((response) => {
      this.setState({ pullRequests: response.data.pullRequests });
    });

    setTimeout(this.getPullRequests, FETCH_INTERVAL);
  }

  render() {
    return (
      <Card title="Reviews Needed" hideOverflow>
        <Column style={{ alignSelf: 'stretch', width: '100%' }}>
          {this.state.pullRequests.map(pr =>
            <PullRequest key={pr.id} pullRequest={pr} />)}
        </Column>
      </Card>
    );
  }
}

export default Dashboard;
