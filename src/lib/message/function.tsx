/**
 * @author heart
 * @description 显示提示消息
 * @Date 2022-03-30
 */

import Less from './index.less';
import '../../assets/font/iconfont.css';
import { useRef } from 'react';
import './animation.less';
import type { message } from './index.d';

enum MessageType {
  danger = 'DANGER',
  success = 'SUCCESS',
  info = 'INFO',
  warning = 'WARNING',
}
interface props {
  message: string;
  type: message.MessageType;
  onclose?: () => void;
}

const MessageFunction: React.FC<props> = function (props) {
  console.log(props.type);

  const type = MessageType[props.type];
  const ref = useRef<HTMLDivElement | null>(null);
  return (
    <>
      <div
        ref={ref}
        onAnimationEnd={(e) => {
          if (/width\-change/.test(e.animationName)) {
            if (ref.current) {
              ref.current.style.animation = 'fade-out 0.38s ease-in-out';
            }
          }
          if (/fade\-out/.test(e.animationName)) {
            if (ref.current) {
              ref.current.style.animation = '';
              if (props.onclose) {
                props.onclose();
              }
            }
          }
        }}
        className={Less['message-card'] + ' ' + Less['message-' + props.type]}
      >
        <span className={'iconfont icon-' + props.type} />
        <div>
          <span>{type}</span>
          <span>{props.message || '操作成功'}</span>
        </div>
      </div>
    </>
  );
};

export default MessageFunction;
