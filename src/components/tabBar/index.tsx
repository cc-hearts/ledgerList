import { useCallback } from 'react';
import styled from 'styled-components';
import { useHistory, useLocation } from 'umi';
interface Props {
  tabBarItem: Array<{ name: string; path: string; icon: string; callback?: (...args: any[]) => void }>;
}
const Tab = styled.ul`
  position: fixed;
  box-sizing: content-box;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 0;
  list-style: none;
  padding-inline-start: 0;
  display: flex;
  font-size: 1rem;
  height: 4rem;
  background-color: var(--primary-tab-bar-color, #fff);
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
  background-color: #fff;
`;
const TabItem = styled.li`
  flex: 1;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  i {
    font-size: 1.5rem;
  }
  &.tab-active {
    color: var(--primary-color, #8cb8f6);
  }
`;
const TabBar: React.FC<Props> = ({ tabBarItem }) => {
  const location = useLocation();
  const history = useHistory();
  const toggleTabBar = useCallback(
    (path: string) => {
      if (path === location.pathname) return;
      history.push(path);
    },
    [location.pathname, history],
  );
  return (
    <Tab>
      {tabBarItem.map((val) => {
        const { icon } = val;
        return (
          <TabItem key={val.path} className={location.pathname === val.path ? 'tab-active' : ''} onClick={() => toggleTabBar(val.path)}>
            <div>
              <i className={icon}></i>
            </div>
            <div>{val.name}</div>
          </TabItem>
        );
      })}
    </Tab>
  );
};

export default TabBar;
