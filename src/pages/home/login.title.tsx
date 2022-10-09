import styled from 'styled-components';
import { primaryColor } from '@/constants/css';
import { useCallback, useRef } from 'react';
import { useState } from 'react';
const Tab = styled.div`
  color: ${primaryColor};
  padding: 0 2rem;
  margin: 1rem 0;
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
}
const TabComponent: React.FC<Props> = ({ changeActive }) => {
  const tabList = useRef([
    { title: '登陆', value: 'login' },
    { title: '注册', value: 'register' },
  ]);
  const [activeTab, setActiveTab] = useState<string>('login');
  const toggleActive = useCallback(
    (value: string) => {
      setActiveTab(() => value);
      changeActive(value === 'login');
    },
    [changeActive],
  );
  return (
    <Tab>
      {tabList.current.map((tabs) => {
        return (
          <span key={tabs.value} className={activeTab === tabs.value ? 'tab-active' : ''} onClick={() => toggleActive(tabs.value)}>
            {tabs.title}
          </span>
        );
      })}
    </Tab>
  );
};
export default TabComponent;
