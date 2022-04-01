import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import MessageFunction from '@/lib/message/function';

interface Props {
  message: string;
  type: 'error' | 'success' | 'info';
}

export const useMessage = function (props: Props) {
  useEffect(() => {
    const { message = 'default', type } = props;
    const divTag = document.createElement('div');
    document.body.appendChild(divTag);
    ReactDOM.render(
      <MessageFunction
        message={props.message}
        onclose={() => {
          ReactDOM.unmountComponentAtNode(divTag);
          document.body.removeChild(divTag);
        }}
      />,
      divTag,
    );
  });
};
