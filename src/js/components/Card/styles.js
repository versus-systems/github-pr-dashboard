import styled from 'styled-components';

export const getContentSize = () => {
  const cardHeight = (window.innerHeight - 90) / 2;
  const contentHeight = cardHeight - 60;

  const cardWidth = (window.innerWidth - 30) / 4;
  const contentWidth = cardWidth - 32;

  return {
    height: contentHeight,
    width: contentWidth,
  };
};

export const Wrapper = styled.div`
  margin: 0 10px 10px 0;
  border: 1px solid #e3e3e3;
  box-sizing: border-box;
  background-color: white;
  display: flex;
  flex-direction: column;

  ${p => p.box && `
    width: 50%;
    height: calc(50vh - 45px);
  `}

  ${p => p.full && `
    height: calc(100vh - 80px);
  `}
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 48px;
  padding: 10px 16px 0;
  flex-grow: 0;
  color: #000;
  font-size: 28px;
  font-weight: bold;
`;

export const Content = styled.div`
  flex-grow: 1;
  overflow: scroll;
  margin: 0 16px 16px;
`;

export const Value = styled.span`
  width: 100%;
  height: 100%;
  font-size: 82px;
  font-weight: bold;
  flex-grow: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;
