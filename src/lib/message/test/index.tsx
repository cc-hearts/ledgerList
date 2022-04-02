import { useMessage } from '@/lib/message/message';
import { Button } from 'antd';
interface props {}

const testMessage: React.FC<props> = function (props) {
  // useMessage({ message: 'test', type: 'success' });
  return (
    <>
      <div>
        <Button
          onClick={(e) => {
            useMessage.success('提示消息');
          }}
        >
          点击弹出success
        </Button>
        <Button
          onClick={(e) => {
            useMessage.warning('提示消息');
          }}
        >
          点击弹出warning
        </Button>
        <Button
          onClick={(e) => {
            useMessage.info('提示消息');
          }}
        >
          点击弹出info
        </Button>
        <Button
          onClick={(e) => {
            useMessage.danger('提示消息');
          }}
        >
          点击弹出danger
        </Button>
      </div>
    </>
  );
};

export default testMessage;
