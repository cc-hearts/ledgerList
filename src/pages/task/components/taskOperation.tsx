/**
 * @author heart
 * @description
 * @Date 2022-10-22
 */
import Tabs from './tabs';
import SelectDate from './selectDate';
import { Form } from '@/components/antd-mobile';
import { Input } from '@/feature/components/index';
import { ButtonWrapper } from '@/components/antd-mobile/button';
import { type RefObject, useCallback, useImperativeHandle, useState, useRef, useEffect } from 'react';
import { addTask, editTask } from '@/api/task';
import { successTips, catchErrorTip } from '@/utils/message';
import { noop } from '@/lib/shard';
import type { formRef, getDataRef } from '@/types/types';
import { clearObjectValue } from '@/utils/shard';
import '@/assets/scss/task/taskOperation.scss';

interface Props {
  toggleVisible: (...args: any[]) => void;
  getDataRef: RefObject<getDataRef>;
  formRef: RefObject<formRef>;
  visible: boolean;
}
const TaskOperation: React.FC<Props> = ({ toggleVisible = noop, getDataRef, formRef, visible }) => {
  const [form] = Form.useForm();
  const [type, setType] = useState<'add' | 'edit'>('add');
  const otherDataRef = useRef<unknown>(null);
  const setEditType = useCallback(
    (data, otherData) => {
      form.setFieldsValue({
        ...data,
      });
      otherDataRef.current = otherData;
    },
    [form],
  );
  const submit = useCallback(async () => {
    try {
      const data = await form.validateFields();
      const req = type === 'add' ? addTask : editTask;
      const params = type === 'add' ? data : Object.assign({}, data, otherDataRef.current);
      const res = await req(params);
      successTips(res.message);
      if (type === 'edit') {
        otherDataRef.current = null;
      }
      toggleVisible();
      getDataRef.current?.getData();
    } catch (e) {
      console.log(e);
      catchErrorTip('必填字段不能为空');
    }
  }, [form, toggleVisible, getDataRef, type]);
  useEffect(() => {
    if (!visible && form) {
      const data = form.getFieldsValue();
      const newData = clearObjectValue(data);
      form.setFieldsValue(newData);
    }
  }, [visible, form]);
  useImperativeHandle(formRef, () => {
    return {
      setFieldsValue: setEditType,
      setType,
      clearForm: form.resetFields,
    };
  });
  return (
    <div className="task-operation-wrapper">
      <Form requiredMarkStyle="asterisk" form={form}>
        <Form.Item name="tag" label="标签" rules={[{ required: true }]}>
          <Tabs useDefaultValue />
        </Form.Item>
        <Form.Item name="date" label="日期" rules={[{ required: true }]}>
          <SelectDate useSingleCurrentDate />
        </Form.Item>
        <Form.Item name="content" label="内容" rules={[{ required: true }]}>
          <Input placeholder="请输入待办事项" />
        </Form.Item>
        <ButtonWrapper text={type === 'add' ? '确认' : '编辑'} callback={submit}></ButtonWrapper>
      </Form>
    </div>
  );
};
export default TaskOperation;
