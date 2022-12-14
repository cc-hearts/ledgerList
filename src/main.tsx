import React from 'react';
import '@/assets/scss/base.scss';
// import '@/assets/font/iconfont.css';
import { useGuard, useUserInfo } from '@/hooks/index';
import type { ChildrenProps } from '@/types/types';

export const UserInfoContext = React.createContext<{
  info: Record<string, unknown> | null;
  clearUserInfo: (() => void) | null;
  getInfo: (() => void) | null;
} | null>(null);

const App: React.FC<ChildrenProps> = function (props) {
  useGuard();

  const [info, clearUserInfo, getInfo] = useUserInfo();
  return <UserInfoContext.Provider value={{ info, clearUserInfo, getInfo }}>{props.children}</UserInfoContext.Provider>;
};
export default App;
