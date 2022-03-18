import React from 'react';
import Less from './index.less';
interface props {}
const Loading: React.FC<props> = function () {
  return (
    <>
      <div className={Less['loading-main']}>
        <div className={Less['mask-loading']}></div>
        <div className={Less['mask-loading']}></div>
        <div className={Less['mask-change']}></div>
        <div className={Less['mask-change']}></div>
      </div>
    </>
  );
};
export default Loading;
