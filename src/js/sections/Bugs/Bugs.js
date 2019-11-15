import React from 'react';
import axios from 'axios';
import { FETCH_INTERVAL } from 'config';
import Card from 'components/Card';
import PieChart from 'components/PieChart';
import { Row, Description } from 'styles';
import { RedText, GreenText } from './styles';

import '../../../images/bug.svg';

const red = '#d0021b';
const green = '#21a12e';

class Bugs extends React.Component {
  state = {
    bugsFixed: 0,
    bugsCreated: 0,
  }

  componentDidMount() {
    this.getBugs();
  }

  getBugs = () => {
    axios.get(`/bugsFixed?token=${localStorage.getItem('token')}`).then((response) => {
      this.setState({ bugsFixed: response.data.count });
    });

    axios.get(`/bugsCreated?token=${localStorage.getItem('token')}`).then((response) => {
      this.setState({ bugsCreated: response.data.count });
    });

    setTimeout(this.getBugs, FETCH_INTERVAL);
  }

  getDescription = () => {
    const { bugsFixed, bugsCreated } = this.state;

    const fixedText = `${bugsFixed} ${bugsFixed === 1 ? 'bug' : 'bugs'}`;
    const filedText = `${bugsCreated} ${bugsCreated === 1 ? 'bug' : 'bugs'}`;
    const fixedFormat = <GreenText>{fixedText}</GreenText>;
    const filedFormat = <RedText>{filedText}</RedText>;

    const fixedVerb = bugsFixed === 1 ? 'was' : 'were';
    const filedVerb = bugsCreated === 1 ? 'was' : 'were';

    return (
      <Description>
        In the past week, {fixedFormat} {fixedVerb} fixed and {filedFormat} {filedVerb} filed.
      </Description>
    );
  };

  render() {
    const { bugsFixed, bugsCreated } = this.state;

    return (
      <Card id="bugs">
        <Row>
          <PieChart
            id="bugs-chart"
            data={[
              {
                color: red,
                title: 'Bugs Created',
                value: bugsCreated
              },
              {
                color: green,
                title: 'Bugs Fixed',
                value: bugsFixed
              },
            ]}
          />

          {this.getDescription()}
        </Row>
      </Card>
    );
  }
}

export default Bugs;
