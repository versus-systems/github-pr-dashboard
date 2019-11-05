import styled from 'styled-components';

export const Wrapper = styled.div`
  border: 1px solid #e3e3e3;
  background-color: white;
  display: flex;
  flex-directon: column;
  flex-wrap: wrap;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 48px;
  padding: 0 16px;
  flex-grow: 0;
  flex-basis: 100%;

  ${p => p.showDivider && `
    border-bottom: solid 1px #e3e3e3;
  `}
`;

export const Title = styled.h3`
  color: #444;
  font-size: 14px;
`;

export const Content = styled.div`
  flex-grow: 1;

  ${p => p.pad && `
    padding: 0 16px;
  `}
`;
