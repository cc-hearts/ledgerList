import Auxiliary from '@/components/auxi';
import { Popup } from '@/components/antd-mobile';
import { useCallback, useRef, useState } from 'react';
import TaskOperation from './taskOperation';
import List from './list';
import type { getDataRef, formRef } from './types';

export default () => {
  const [visible, setVisible] = useState(false);
  const getDataRef = useRef<getDataRef>(null);
  const formRef = useRef<formRef>(null);
  const toggleVisible = useCallback(() => {
    setVisible((state) => !state);
  }, []);
  const showAdd = useCallback(() => {
    toggleVisible();
    formRef.current?.setType(() => 'add');
  }, [toggleVisible]);

  return (
    <>
      <List getDataRef={getDataRef} FormImplRef={formRef} showPopup={toggleVisible} />
      <Auxiliary callback={showAdd} />
      <Popup visible={visible} onMaskClick={toggleVisible}>
        <TaskOperation visible={visible} toggleVisible={toggleVisible} getDataRef={getDataRef} formRef={formRef} />
      </Popup>
    </>
  );
};
