import React from 'react';
import Bugs from 'sections/Bugs';
import Latency from 'sections/Latency';
import { Row, Column } from 'styles';

class Metrics extends React.Component {
  render() {
    return (
      <Column>
        <Row style={{ flexGrow: 2 }}>
          <Latency />
        </Row>

        <Row style={{ flexGrow: 1 }}>
          <Bugs />
        </Row>

      </Column>
    );
  }
}

export default Metrics;
