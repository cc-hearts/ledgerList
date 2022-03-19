import React from 'react';
import Less from './index.less';
import { useHistory } from 'react-router';
interface props {}
const Error: React.FC<props> = function () {
  const history = useHistory();
  return (
    <div className={Less['error']}>
      <div>
        <span>404</span>
        <span>Page not found</span>
        <a
          className="green-400"
          onClick={() => {
            history.go(-1);
          }}
        >
          review more
        </a>
      </div>
      <img src={require('../../assets/img/not_found.png')} alt="" />
    </div>
  );
};

export default Error;
