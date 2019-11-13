import React from 'react';
import PropTypes from 'prop-types';
import { Margin, Wrapper, Header, Content } from './styles';

const Card = ({
  id,
  title,
  children,
  hideOverflow,
  basis,
}) => (
  <Margin hideOverflow={hideOverflow} basis={basis}>
    <Wrapper id={id} hideOverflow={hideOverflow}>
      {title &&
        <Header>
          {title}
        </Header>
      }
      <Content hideOverflow={hideOverflow}>
        {children}
      </Content>
    </Wrapper>
  </Margin>
);

Card.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.object,
  hideOverflow: PropTypes.bool,
  basis: PropTypes.number,
};

export default Card;
