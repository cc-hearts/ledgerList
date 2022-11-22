import styled from 'styled-components';
import { primaryColor } from '@/constants/css';
import { useRef } from 'react';
import { memo } from 'react';
const Tab = styled.div`
  color: ${primaryColor};
  padding: 0 2rem;
  margin: 3rem 0 1rem;
  & span {
    margin: 0 0.8rem 0 0;
  }

  & span.tab-active {
    font-size: 1.2em;
    position: relative;
    &:after {
      content: '';
      width: 100%;
      position: absolute;
      bottom: -0.3rem;
      left: 0;
      border: 1px solid ${primaryColor};
    }
  }
`;
interface Props {
  changeActive: (status: boolean) => void;
  active: boolean;
}
const TabComponent: React.FC<Props> = ({ changeActive, active }) => {
  const tabList = useRef([
    { title: '登陆', value: true, id: 'login' },
    { title: '注册', value: false, id: 'register' },
  ]);
  const toggleActive = (bool: boolean) => {
    if (bool === active) return;
    changeActive(!bool);
  };
  return (
    <Tab>
      {tabList.current.map((tabs) => {
        return (
          <span key={tabs.id} className={active === tabs.value ? 'tab-active' : ''} onClick={() => toggleActive(tabs.value)}>
            {tabs.title}
          </span>
        );
      })}
    </Tab>
  );
};
export default memo(TabComponent);
