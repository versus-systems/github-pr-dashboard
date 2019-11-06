import React from 'react';
import PropTypes from 'prop-types';
import { Wrapper, Header, Content } from './styles';

const Card = ({
  title,
  children,
  padContent,
  box,
  full,
}) => (
  <Wrapper box={box} full={full}>
    <Header>
      {title}
    </Header>
    <Content pad={padContent}>
      {children}
    </Content>
  </Wrapper>
);

Card.propTypes = {
  hint: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.object,
  padContent: PropTypes.bool,
  titleDivider: PropTypes.bool,
  box: PropTypes.bool,
  full: PropTypes.bool,
};

export default Card;
