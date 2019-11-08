import React from 'react';
import PropTypes from 'prop-types';
import GaugeChart from 'react-gauge-chart';


const monthColors = [
  '#00ff00',
  '#1bff00',
  '#37ff00',
  '#51ff00',
  '#6aff00',
  '#86ff00',
  '#a1ff00',
  '#bcff00',
  '#d7ff00',
  '#f2ff00',
  '#fff200',
  '#ffd700',
  '#ffbc00',
  '#ffa100',
  '#ff8600',
  '#ff6a00',
  '#ff5100',
  '#ff3700',
  '#ff1b00',
  '#ff0000',
];

const sprintColors = [
  '#00ff00',
  '#37ff00',
  '#6aff00',
  '#a1ff00',
  '#d7ff00',
  '#fff200',
  '#ffbc00',
  '#ff8600',
  '#ff5100',
  '#ff0000',
];

const getColors = (type, value) => {
  const colorPatterns = type === 'month' ? monthColors : sprintColors;

  return colorPatterns.map((color, i) => {
    const alpha = i < value ? 'ff' : '66';
    return `${color}${alpha}`;
  });
};


const Gauge = ({ id, value, max, type }) => (
  <GaugeChart
    id={id}
    arcPadding={0}
    cornerRadius={0}
    nrOfLevels={max}
    colors={getColors(type, value)}
    percent={value / max}
    needleColor={'transparent'}
    needleBaseColor={'transparent'}
  />
);

Gauge.propTypes = {
  id: PropTypes.string,
  max: PropTypes.number,
  value: PropTypes.number,
  type: PropTypes.string,
};

export default Gauge;
