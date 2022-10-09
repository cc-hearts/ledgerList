import { UnlockOutline, UserContactOutline, LinkOutline } from 'antd-mobile-icons';
import { Button, Input } from '@/components/antd-mobile/index';
import { useRef, useState, useCallback } from 'react';
import Verification from '@/components/verification/verification';
import type { SVGProps } from 'react';
import Tab from './login.title';
import styled from 'styled-components';
const List = styled.div`
  width: 100%;
  padding: 0 2rem;
`;
const ListItem = styled.div`
  display: flex;
  margin: 0.8rem 0;
  align-items: center;
  & svg {
    margin-right: 0.8rem;
  }
  & > div {
    flex: 1;
  }
  & input {
    border: none;
    width: 100%;
    background: transparent;
    padding: 1rem 0;
    &:focus-visible {
      outline: none;
    }
  }
`;
interface FormList {
  name: string;
  prefixIcon: React.FC<SVGProps<SVGSVGElement>>;
  components: any;
  placeholder?: string;
  type?: string;
  suffixComponent?: React.FC<any>;
}
const Login = () => {
  const [, setActiveLogin] = useState(true);
  const formRef = useRef<Array<FormList>>([
    {
      name: 'username',
      prefixIcon: UserContactOutline,
      components: Input,
      placeholder: '请输入账号',
    },
    {
      name: 'password',
      prefixIcon: UnlockOutline,
      components: Input,
      type: 'password',
      placeholder: '请输入密码',
    },
  ]);
  const changeActiveLogin = useCallback((status: boolean) => {
    if (!status && formRef.current.length === 2) {
      // 改为注册状态
      formRef.current.push({
        name: 'verification',
        prefixIcon: LinkOutline,
        suffixComponent: Verification,
        components: Input,
        placeholder: '请输入验证码',
      });
    } else if (status && formRef.current.length > 2) {
      formRef.current = formRef.current.slice(0, -1);
    }
    setActiveLogin(() => status);
  }, []);
  return (
    <>
      <Tab changeActive={changeActiveLogin} />
      <List>
        {formRef.current.map((val) => {
          const { prefixIcon: Icon, components: Components, suffixComponent: SuffixComponents } = val;
          return (
            <ListItem key={val.name}>
              <Icon fontSize={24} />
              <Components placeholder={val.placeholder || ''} type={val.type || 'text'} />
              {SuffixComponents && <SuffixComponents width={100} height={50} text={'1234'} />}
            </ListItem>
          );
        })}
        <Button block color="primary" fill="solid">
          确定
        </Button>
      </List>
    </>
  );
};

export default Login;
