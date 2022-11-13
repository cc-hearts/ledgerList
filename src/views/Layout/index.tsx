import TabBar from '@/components/tabBar';
import { tabBar } from './constants';
import { useGuard, useUserInfo } from './guard';
import './layout.css';
import '../../assets/font/iconfont.css';
import React from 'react';
interface Props {
  children?: React.ReactNode;
}

export const UserInfoContext = React.createContext<{
  info: Record<string, unknown> | null;
  clearUserInfo: (() => void) | null;
  getInfo: (() => void) | null;
} | null>(null);

export const LayoutIndex: React.FC<Props> = ({ children }) => {
  useGuard();
  const [info, clearUserInfo, getInfo] = useUserInfo();
  return (
    <UserInfoContext.Provider value={{ info, clearUserInfo, getInfo }}>
      {children}
      <TabBar tabBarItem={tabBar}></TabBar>
    </UserInfoContext.Provider>
  );
};

export default LayoutIndex;
