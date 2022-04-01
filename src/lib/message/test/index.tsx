import { useMessage } from '@/lib/message/message';

interface props {}

const testMessage: React.FC<props> = function (props) {
  useMessage({ message: 'test', type: 'success' });
  return <>test message</>;
};

export default testMessage;
