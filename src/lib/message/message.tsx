import ReactDOM from 'react-dom';
import MessageFunction from '@/lib/message/function';
import Less from './index.less';
import type { message } from './index.d';
interface Props {
  message: string;
  type: message.MessageType;
}
interface useMessage {
  (props: Props): void;
  success: (message: string) => void;
  warning: (message: string) => void;
  info: (message: string) => void;
  danger: (message: string) => void;
}
export const useMessage: useMessage = function (props: Props) {
  const { message = 'default', type = 'success' } = props;
  // 判断body下面是否存在divTag
  var root = document.querySelector('div#_message__card');
  if (!root || root.parentNode !== document.body) {
    root = document.createElement('div');
    root.id = '_message__card';
    if (root instanceof HTMLDivElement) {
      root.setAttribute('style', 'position: absolute;top:0px;right: 12px');
    }
    document.body.appendChild(root);
  }
  if (root && root.hasChildNodes()) {
    if (root.childNodes.length <= 8) {
    }
  }
  let divTag = document.createElement('div');
  divTag.className = Less['message-card-position'];
  if (root && root.childNodes.length <= 8) {
    root.appendChild(divTag);
  }
  //render(element, container[, callback])
  // 如果 React 元素之前已经在 container 里渲染过，这将会对其执行更新操作，并仅会在必要时改变 DOM 以映射最新的 React 元素。
  ReactDOM.render(
    <MessageFunction
      // key={new Date().getTime()}
      message={message}
      type={type}
      onclose={() => {
        if (divTag) {
          // unmountComponentAtNode用于移除组件并且事件监听器和state一起移除 不能用于移除dom元素
          ReactDOM.unmountComponentAtNode(divTag);
          // root ? root.removeChild(divTag) : null;
          if (root && !root?.hasChildNodes()) {
            document.body.removeChild(root);
          }
        }
      }}
    />,
    divTag,
  );
  // 验证首次调用是否将子节点全部替换
  // divTag.appendChild(document.createElement('div'))
};

useMessage.success = function (message: string) {
  useMessage({
    message,
    type: 'success',
  });
};
useMessage.warning = function (message: string) {
  useMessage({
    message,
    type: 'warning',
  });
};
useMessage.info = function (message: string) {
  useMessage({
    message,
    type: 'info',
  });
};
useMessage.danger = function (message: string) {
  useMessage({
    message,
    type: 'danger',
  });
};
