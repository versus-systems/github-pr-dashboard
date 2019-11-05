import React from 'react';
import PropTypes from 'prop-types';
import { Wrapper, Title, Header, Content } from './styles';

const Card = ({
  title,
  children,
  padContent,
  titleDivider,
}) => (
  <Wrapper data-cy="metric">
    <Header showDivider={titleDivider}>
      <Title>{title}</Title>
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
};

export default Card;
