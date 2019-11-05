import React from 'react';
import PropTypes from 'prop-types';
import { Wrapper, Content, Value, Footer } from './styles';

const Metric = ({
  currentValue,
  goal,
}) => (
  <Wrapper>
    <Content>
      <Value>
        {currentValue}
      </Value>
    </Content>
    {
      goal &&
        <Footer>
          {`Goal: ${goal}`}
        </Footer>
    }
  </Wrapper>
);

Metric.propTypes = {
  type: PropTypes.string,
  currentValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  previousValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  goal: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default Metric;
