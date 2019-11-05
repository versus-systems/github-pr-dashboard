import styled from 'styled-components';

export const Wrapper = styled.div.attrs({
  className: p => (p.compact ? 'compact' : ''),
})`
  display: flex;
  flex-direction: column;
  height: 100%;

  svg {
    vertical-align: top
  }
`;

export const Content = styled.div`
  flex-grow: 1;
  padding: 0 16px;

  ${Wrapper}:not(.compact) & {
    padding-bottom: 16px
  }
`;

export const Value = styled.span`
  font-size: 18px;
  flex-grow: 0;
  display: flex;
  align-items: center;
`;

export const Footer = styled.div`
  height: 48px;
  font-size: 12px;
  padding: 0 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${Wrapper}:not(.compact) & {
    border-top: solid 1px #e3e3e3;
  }
`;
