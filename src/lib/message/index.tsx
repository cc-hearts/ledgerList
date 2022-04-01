/**
 * @author heart
 * @description 显示提示消息
 * @Date 2022-03-30
 */

import Less from './index.less';
import '../../assets/font/iconfont.css';
import { useRef, useState } from 'react';
import './animation.less';

interface props {
  message: string;
}

const Message: React.FC<props> = function (props) {
  const [show, setShow] = useState(true);
  const ref = useRef<HTMLDivElement | null>(null);
  return (
    <>
      {show ? (
        <div
          ref={ref}
          onAnimationEnd={(e) => {
            if (/width\-change/.test(e.animationName)) {
              if (ref.current) {
                ref.current.style.animation = 'fade-out 0.38s ease-in-out';
              }
            }
            if (/fade\-out/.test(e.animationName)) {
              setTimeout(() => {
                if (ref.current) {
                  ref.current.style.animation = '';
                }
              }, 500);
              setShow(false);
            }
          }}
          className={Less['message-card']}
        >
          <span className="iconfont icon-zhengque"></span>
          <div>
            <span>成功</span>
            <span>{props.message || '操作成功'}</span>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Message;
