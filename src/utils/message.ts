import { Toast } from '../components/antd-mobile/';

type func = (...args: any[]) => unknown;
export function tips(content: string, type: keyof typeof Toast, afterClose?: func) {
  Toast[type]({
    content,
    afterClose,
  });
}

export function successTips(content: string, afterClose?: func) {
  tips(content, 'show', afterClose);
}

export function errorTips(content: string, afterClose?: func) {
  tips(content, 'show', afterClose);
}
