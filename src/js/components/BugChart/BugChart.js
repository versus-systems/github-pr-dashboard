import React from 'react';
import PropTypes from 'prop-types';
import ReactMinimalPieChart from 'react-minimal-pie-chart';
import Card from '../Card';
import { RedText, GreenText } from './styles';
import { Row, Description } from '../styles';

import '../../../images/bug.svg';

const red = '#d0021b';
const green = '#21a12e';

const BugChart = ({ bugsFixed, bugsCreated }) => {
  const getDescription = () => {
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

  return (
    <Card id="bugs">
      <Row>
        <ReactMinimalPieChart
          animate={false}
          animationDuration={500}
          animationEasing="ease-out"
          cx={50}
          cy={50}
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
          id="bug-chart"
          label={false}
          labelPosition={50}
          lengthAngle={360}
          lineWidth={30}
          onClick={undefined}
          onMouseOut={undefined}
          onMouseOver={undefined}
          paddingAngle={0}
          radius={50}
          ratio={1}
          rounded={false}
          startAngle={270}
        />

        {getDescription()}
      </Row>
    </Card>
  );
};

BugChart.propTypes = {
  bugsFixed: PropTypes.number,
  bugsCreated: PropTypes.number,
};

export default BugChart;
