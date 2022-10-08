import { UnlockOutline, UserContactOutline } from 'antd-mobile-icons';
import { Input } from 'antd-mobile/es/components/input/input';
import { useRef } from 'react';
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
    background: transparent;
    padding: 1rem 0;
    &:focus-visible {
      outline: none;
    }
  }
`;
const Login = () => {
  const formRef = useRef([
    {
      prefixIcon: UserContactOutline,
      components: Input,
      placeholder: '请输入账号',
    },
    {
      prefixIcon: UnlockOutline,
      components: Input,
      type: 'password',
      placeholder: '请输入密码',
    },
  ]);
  // TODO: 确认密码的逻辑
  return (
    <List>
      {formRef.current.map((val) => {
        const { prefixIcon: Icon, components: Components } = val;
        return (
          <ListItem>
            <Icon fontSize={24} />
            <Components placeholder={val.placeholder || ''} type={val.type || 'text'} />
          </ListItem>
        );
      })}
    </List>
  );
};

export default Login;
