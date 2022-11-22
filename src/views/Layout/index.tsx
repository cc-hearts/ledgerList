import React from 'react';
import TabBar from '@/components/tabBar';
import { LayoutConstants } from '@/constants/index';

import type { ChildrenProps } from '@/types/types';

const { tabBar } = LayoutConstants;

export const LayoutIndex: React.FC<ChildrenProps> = ({ children }) => {
  return (
    <>
      {children}
      <TabBar tabBarItem={tabBar}></TabBar>
    </>
  );
};

export default LayoutIndex;
