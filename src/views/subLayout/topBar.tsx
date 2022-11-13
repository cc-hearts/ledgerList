// 顶部烂
import styled from 'styled-components';
import { LeftOutline } from 'antd-mobile-icons';
import { history } from 'umi';
import { useCallback } from 'react';
const TopBarComponent = styled.div`
  width: 100%;
  background-color: #fff;
  display: flex;
  height: 3rem;
  align-items: center;
  span {

    &:first-child {
      width: 2rem;
      padding-left: 0.5rem;
    }
    &:last-child {
      width: 2rem;
    }
    &:not(:first-child):not(:last-child) {
      flex: 1;
      height:100%;
      display: flex;
      align-items: center;
      justify-content: center;
  }
`;
interface Props {
  title: string;
}
const TopBar: React.FC<Props> = ({ title }) => {
  const goBack = useCallback(() => {
    history.go(-1);
  }, []);
  return (
    <TopBarComponent>
      <span onClick={goBack}>
        <LeftOutline fontSize={24} />
      </span>
      <span>{title}</span>
      <span></span>
    </TopBarComponent>
  );
};
export default TopBar;
