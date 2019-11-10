import React from 'react';
import PropTypes from 'prop-types';
import { Wrapper, Header, Content } from './styles';

const Card = ({
  id,
  title,
  children,
  padContent,
  box,
  full,
}) => (
  <Wrapper id={id} box={box} full={full}>
    {title &&
      <Header>
        {title}
      </Header>
    }
    <Content pad={padContent}>
      {children}
    </Content>
  </Wrapper>
);

Card.propTypes = {
  id: PropTypes.string,
  hint: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.object,
  padContent: PropTypes.bool,
  titleDivider: PropTypes.bool,
  box: PropTypes.bool,
  full: PropTypes.bool,
};

export default Card;
