/**
 * @author cc-heart
 * @description 重置密码
 * @Date 2022-11-16
 */
import { Form, Input } from '@/components/antd-mobile/index';
import FixedButton from '@/feature/components/button';
import { successTips } from '@/utils/message';
import type { FormInstance } from 'antd-mobile/es/components/form/form';
import { useCallback, useRef, useState } from 'react';
import { history } from 'umi';
import { changeUpdate } from '@/api/user';
import '@/assets/scss/user/resetPassword.scss';

const ResetPassword = () => {
  const form = useRef<FormInstance>(null);
  const [load, setLoad] = useState(false);
  const submit = useCallback(() => {
    form.current?.validateFields().then((res) => {
      const { password, newPassword } = res;
      setLoad(true);
      let flag: boolean;
      changeUpdate({ password, newPassword })
        .then((res) => {
          flag = true;
          successTips(res.message);
          localStorage.removeItem('token');
          history.push('/login');
        })
        .finally(() => {
          !flag && setLoad(false);
        });
    });
  }, []);

  const validatePassword = useCallback((rule, value, callback) => {
    const field = form.current?.getFieldValue('newPassword');
    if (field !== value) {
      callback('新旧密码不一致');
      return;
    }
    callback();
  }, []);
  return (
    <div className="reset-password__wrapper">
      <Form ref={form}>
        <Form.Item name="password" label="旧密码" rules={[{ required: true }]}>
          <Input placeholder="请填写旧密码" type={'password'} />
        </Form.Item>
        <Form.Item name="newPassword" label="新密码" rules={[{ required: true }]}>
          <Input placeholder="请填写新密码" type={'password'} />
        </Form.Item>
        <Form.Item
          name="reNewPassword"
          label="再次输入新密码"
          rules={[
            {
              required: true,
              validator: validatePassword,
            },
          ]}
        >
          <Input placeholder="请再次填写新密码" type={'password'} />
        </Form.Item>
      </Form>
      <FixedButton text={'保存'} color="primary" onClick={submit} load={load} />
    </div>
  );
};
export default ResetPassword;
