import React from 'react';
import TabBar from '@/components/tabBar';
import { LayoutConstants } from '@/constants/index';
import { useGuard, useUserInfo } from '@/hooks/index';
import type { ChildrenProps } from '@/types/types';

const { tabBar } = LayoutConstants;

export const UserInfoContext = React.createContext<{
  info: Record<string, unknown> | null;
  clearUserInfo: (() => void) | null;
  getInfo: (() => void) | null;
} | null>(null);

export const LayoutIndex: React.FC<ChildrenProps> = ({ children }) => {
  useGuard();
  const [info, clearUserInfo, getInfo] = useUserInfo();
  console.log(children);
  return (
    <UserInfoContext.Provider value={{ info, clearUserInfo, getInfo }}>
      {children}
      <TabBar tabBarItem={tabBar}></TabBar>
    </UserInfoContext.Provider>
  );
};

export default LayoutIndex;
