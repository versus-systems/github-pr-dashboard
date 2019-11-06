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
  width: 100%;
  height: 50px;
  line-height: 50px;
  text-align: center;
  font-size: 32px;
  font-weight: bold;
  padding-bottom: 10px;
`;
