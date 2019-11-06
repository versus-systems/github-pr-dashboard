import styled from 'styled-components';

export const Wrapper = styled.div`
  margin: 0 10px 10px 0;
  border: 1px solid #e3e3e3;
  box-sizing: border-box;
  background-color: white;
  display: flex;
  flex-direction: column;

  ${p => p.box && `
    width: 50%;
    height: calc(50vh - 43px);
  `}

  ${p => p.full && `
    height: calc(100vh - 75px);
  `}
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 48px;
  padding: 0 16px;
  flex-grow: 0;

  ${p => p.showDivider && `
    border-bottom: solid 1px #e3e3e3;
  `}
`;

export const Title = styled.h3`
  color: #444;
  font-size: 24px;
`;

export const Content = styled.div`
  flex-grow: 1;
  overflow: scroll;
  margin: 0 16px 16px;

  ${p => p.pad && `
    padding: 0 16px 16px 16px;
  `}
`;
