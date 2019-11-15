import React from 'react';
import PropTypes from 'prop-types';
import ReactMinimalPieChart from 'react-minimal-pie-chart';

const PieChart = ({ id, data }) => (
  <ReactMinimalPieChart
    animate={false}
    animationDuration={500}
    animationEasing="ease-out"
    cx={50}
    cy={50}
    data={data}
    id={id}
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

PieChart.propTypes = {
  id: PropTypes.number,
  data: PropTypes.number,
};

export default PieChart;
