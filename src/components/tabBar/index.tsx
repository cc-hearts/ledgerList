import { useCallback } from 'react';
import styled from 'styled-components';
import { useHistory, useLocation } from 'umi';
interface Props {
  tabBarItem: Array<{ name: string; path: string; icon: React.FC<any>; callback?: (...args: any[]) => void }>;
}

const Tab = styled.ul`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 0;
  list-style: none;
  padding-inline-start: 0;
  display: flex;
  font-size: 1rem;
  background-color: var(--primary-tab-bar-color, #fff);
`;
const TabItem = styled.li`
  flex: 1;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
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
        const { icon: ComponentsIcon } = val;
        return (
          <TabItem key={val.path} className={location.pathname === val.path ? 'tab-active' : ''} onClick={() => toggleTabBar(val.path)}>
            <div>
              <ComponentsIcon />
            </div>
            <div>{val.name}</div>
          </TabItem>
        );
      })}
    </Tab>
  );
};

export default TabBar;
