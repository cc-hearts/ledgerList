import React from 'react';
import Less from './index.less';
interface props {}
const Error: React.FC<props> = function () {
  return (
    <div className={Less['error']}>
      <span></span>
      <span></span>
    </div>
  );
};

export default Error;
