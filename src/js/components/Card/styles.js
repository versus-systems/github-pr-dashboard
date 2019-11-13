import styled from 'styled-components';

export const Margin = styled.div`
  padding: 0 30px 30px 0;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow: hidden;

  ${p => (p.basis ? `flex: 0 0 ${p.basis}px` : '')}
`;

export const Wrapper = styled.div`
  border: 1px solid #313452;
  padding: 30px;
  box-sizing: border-box;
  background-color: #26293b;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow: hidden;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 48px;
  padding: 10px 16px 0;
  flex-grow: 0;
  color: #959cb6;
  font-size: 28px;
  padding-bottom: 30px;
`;

export const Content = styled.div`
  display: flex;
  flex-grow: 1;
  align-items: center;
  overflow: scroll;
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
