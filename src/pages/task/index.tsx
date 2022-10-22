import Auxiliary from '@/components/auxi';
import { Popup } from '@/components/antd-mobile';
import { useCallback, useState } from 'react';
import TaskOperation from './taskOperation';
export default () => {
  const [visible, setVisible] = useState(false);
  const toggleVisible = useCallback(() => {
    setVisible((state) => !state);
  }, []);
  return (
    <>
      <Auxiliary callback={toggleVisible} />
      <Popup visible={visible} onMaskClick={toggleVisible}>
        <TaskOperation />
      </Popup>
    </>
  );
};
