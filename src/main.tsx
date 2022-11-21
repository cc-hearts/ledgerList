import React from 'react';
import '@/assets/scss/base.scss';
import '@/assets/font/iconfont.css';

import type { ChildrenProps } from '@/types/types';

const App: React.FC<ChildrenProps> = function (props) {
  return <>{props.children}</>;
};
export default App;
