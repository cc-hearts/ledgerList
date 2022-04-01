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
            useMessage({ message: 'test', type: 'success' });
          }}
        >
          点击弹出message
        </Button>
      </div>
    </>
  );
};

export default testMessage;
