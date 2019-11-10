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
  padding: 30px 0 0 30px;
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

export const Description = styled.div`
  font-size: 24px;
  flex: 2;
  padding: 40px;
  box-sizing: border-box;
`;
