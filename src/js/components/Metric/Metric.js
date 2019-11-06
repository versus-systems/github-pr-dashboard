import React from 'react';
import PropTypes from 'prop-types';
import { Value } from './styles';

const Metric = ({
  currentValue,
}) => (
  <Value>
    {currentValue}
  </Value>
);

Metric.propTypes = {
  currentValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default Metric;
