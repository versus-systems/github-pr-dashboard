import styled from 'styled-components';

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  ${p => (p.flex ? `flex: ${p.flex}` : '')}
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  ${p => (p.flex ? `flex: ${p.flex}` : '')}
`;

export const Wrapper = styled.div`
  padding: 10px 0 0 10px;
`;

export const Header = styled.div`
  text-align: center;
  width: 100%;
  font-size: 32px;
  font-weight: bold;
  padding-bottom: 10px;
`;
