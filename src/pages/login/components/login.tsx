import { Button } from '@/components/antd-mobile/index';
import { useRef, useState, useCallback } from 'react';
import Tab from './login.title';
import { loginUser, registerUser } from '../../../api/login';
import { catchErrorTip, errorTips, successTips } from '../../../utils/message';
import LoginForm from './form';
import { history } from 'umi';
import type { loginForm } from './form';
import styled from 'styled-components';

export const ButtonWrapper = styled.div`
  width: 100%;
  padding: 0 2rem;
`;

const Login = () => {
  const [active, setActiveLogin] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const formsRef = useRef<{ getData: () => loginForm; clearFormData: (...args: any[]) => void }>(null);
  const changeActiveLogin = useCallback(() => {
    setActiveLogin((state) => !state);
    formsRef.current?.clearFormData();
  }, []);

  const handleSubmit = useCallback(() => {
    if (!formsRef.current) return;
    setDisabled(true);
    const data = formsRef.current.getData();
    let flag: boolean;
    (active ? loginUser : registerUser)({ ...data })
      .then((res) => {
        flag = true;
        successTips(res.message);
        if (!res.data && active) {
          errorTips('登陆失败 token无法获取');
          return;
        }
        if (typeof res.data === 'string') {
          // TODO: register
          return;
        }
        if (!active) {
          changeActiveLogin();
        } else {
          const token = res?.data?.token;
          token && localStorage.setItem('token', token);
        }
        history.push('/main/task');
      })
      .catch((e) => {
        catchErrorTip(e);
      })
      .finally(() => {
        !flag && setDisabled(false);
      });
  }, [active, changeActiveLogin]);

  console.log('render: login.tsx');
  return (
    <>
      <Tab changeActive={changeActiveLogin} active={active} />
      <form>
        <LoginForm active={active} formRefs={formsRef} />
        <ButtonWrapper>
          <Button block color="primary" fill="solid" onClick={handleSubmit} loading={disabled}>
            确定
          </Button>
        </ButtonWrapper>
      </form>
    </>
  );
};

export default Login;
