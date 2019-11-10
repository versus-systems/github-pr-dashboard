import React from 'react';
import PropTypes from 'prop-types';
import ReactMinimalPieChart from 'react-minimal-pie-chart';

import '../../../images/bug.svg';

const BugChart = ({ bugsFixed, bugsCreated /* , height, width*/ }) => (
  <ReactMinimalPieChart
    animate={false}
    animationDuration={500}
    animationEasing="ease-out"
    cx={50}
    cy={50}
    data={[
      {
        color: '#d0021b',
        title: 'Bugs Created',
        value: bugsCreated
      },
      {
        color: '#21a12e',
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
);

BugChart.propTypes = {
  bugsFixed: PropTypes.number,
  bugsCreated: PropTypes.number,
  height: PropTypes.number,
  width: PropTypes.number,
};

export default BugChart;
