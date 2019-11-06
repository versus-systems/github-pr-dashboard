import React from 'react';
import PropTypes from 'prop-types';
import SvgGauge from 'react-svg-gauge';

const Gauge = ({ value, min, max, height, width }) => (
  <SvgGauge
    value={value}
    min={min}
    max={max}
    label=""
    valueFormatter={val => `${val} days`}
    minMaxLabelStyle={{ display: 'none' }}
    valueLabelStyle={{ fontSize: '30px', fontWeight: 'bold' }}
    width={width}
    height={height}
  />
);

Gauge.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  value: PropTypes.number,
  height: PropTypes.number,
  width: PropTypes.number,
};

export default Gauge;
