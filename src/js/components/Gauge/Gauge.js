import React from 'react';
import PropTypes from 'prop-types';
import GaugeChart from 'react-gauge-chart';
import { Column } from 'styles';

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

const Gauge = ({
  id, value, max, type, description
}) => {
  if (!value) {
    return null;
  }

  const colorPatterns = type === 'month' ? monthColors : sprintColors;
  const colors = colorPatterns.map((color, i) => {
    const alpha = i < value ? 'ff' : '33';
    return `${color}${alpha}`;
  });
  const formattedValue = (
    <span
      style={{
        color: colors[value - 1],
        fontWeight: 'bold'
      }}
    >
      {value} days
    </span>
  );

  return (
    <Column>
      <GaugeChart
        id={id}
        arcPadding={0}
        cornerRadius={0}
        nrOfLevels={max}
        colors={colors}
        percent={value / max}
        needleColor="#959cb6"
        needleBaseColor="#959cb6"
        hideText
      />
      {description(formattedValue)}
    </Column>
  );
};

Gauge.propTypes = {
  id: PropTypes.string,
  max: PropTypes.number,
  value: PropTypes.number,
  type: PropTypes.string,
  description: PropTypes.func,
};

export default Gauge;
