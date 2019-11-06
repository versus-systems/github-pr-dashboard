import React from 'react';
import PropTypes from 'prop-types';
import { VictoryPie } from 'victory';

const BugChart = ({ bugsFixed, bugsCreated, height, width }) => (
  <VictoryPie
    style={{
      parent: {
        marginTop: -30,
      },
      labels: {
        color: 'white',
      }
    }}
    innerRadius={20}
    colorScale={['green', 'red']}
    data={[
      { x: bugsFixed, y: bugsFixed, color: 'green' },
      { x: bugsCreated, y: bugsCreated, color: 'red' },
    ]}
    width={width}
    height={height + 50}
    padAngle={3}
    labelRadius={({ innerRadius, radius }) => (innerRadius + radius) / 2}
  />
);

BugChart.propTypes = {
  bugsFixed: PropTypes.number,
  bugsCreated: PropTypes.number,
  height: PropTypes.number,
  width: PropTypes.number,
};

export default BugChart;
