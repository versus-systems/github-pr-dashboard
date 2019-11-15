import React from 'react';
import axios from 'axios';
import Card from './Card';
import PullRequest from './PullRequest';
import { Column } from './styles';

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

    setTimeout(this.getPullRequests, 30000);
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
