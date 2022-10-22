/**
 * @author heart
 * @description
 * @Date 2022-10-22
 */
import styled from 'styled-components';
import { Form } from '@/components/antd-mobile';
import Tabs from './tabs';
import SelectDate from './selectDate';
import { Input } from '@/feature/components/index';
import { ButtonWrapper } from '@/components/antd-mobile/button';
import { useCallback } from 'react';
const Wrapper = styled.div`
  height: 60vh;
`;
const TaskOperation = () => {
  const [form] = Form.useForm();
  const submit = useCallback(() => {
    form.validateFields().then((res) => {
      // TODO: 待接口
      console.log(res);
    });
  }, [form]);
  return (
    <Wrapper>
      <Form requiredMarkStyle="asterisk" form={form}>
        <Form.Item name="tag" label="标签" rules={[{ required: true }]}>
          <Tabs useDefaultValue />
        </Form.Item>
        <Form.Item name="date" label="日期" rules={[{ required: true }]}>
          <SelectDate />
        </Form.Item>
        <Form.Item name="content" label="内容" rules={[{ required: true }]}>
          <Input placeholder="请输入待办事项" />
        </Form.Item>
        <ButtonWrapper text={'确认'} callback={submit}></ButtonWrapper>
      </Form>
    </Wrapper>
  );
};
export default TaskOperation;
