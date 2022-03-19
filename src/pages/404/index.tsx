import React from 'react';
import Less from './index.less';
interface props {}
const Error: React.FC<props> = function () {
  return (
    <div className={Less['error']}>
      <img src={require('../../assets/img/not_found.png')} alt="" />
      <div>
        <span>404</span>
        <span>Page not found</span>
      </div>
    </div>
  );
};

export default Error;
