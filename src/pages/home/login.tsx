import { UnlockOutline, UserContactOutline, LinkOutline } from 'antd-mobile-icons';
import { Button, Input } from '@/components/antd-mobile/index';
import { useRef, useState, useCallback } from 'react';
import Verification from '@/components/verification/verification';
import Tab from './login.title';
import styled from 'styled-components';
import useFormData from './useForm';
import { geneVerification } from '@/lib/shard';
import type { SVGProps } from 'react';
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

interface loginForm {
  username: string;
  password: string;
  verification: string;
  [props: string]: unknown;
}
interface FormList {
  name: string;
  prefixIcon: React.FC<SVGProps<SVGSVGElement>>;
  components: any;
  placeholder?: string;
  type?: string;
  suffixComponent?: React.FC<any>;
  field: string;
}
const Login = () => {
  const [, setActiveLogin] = useState(true);
  const { data, setFieldValue, clearFormData } = useFormData<loginForm>({ username: '', password: '', verification: '' });
  const formRef = useRef<Array<FormList>>([
    {
      name: 'username',
      prefixIcon: UserContactOutline,
      components: Input,
      field: 'username',
      placeholder: '请输入账号',
    },
    {
      name: 'password',
      prefixIcon: UnlockOutline,
      components: Input,
      type: 'password',
      field: 'password',
      placeholder: '请输入密码',
    },
  ]);
  const [validate, setValidate] = useState(geneVerification());
  const handleCanvasChange = useCallback(() => {
    setValidate(geneVerification());
  }, []);
  const changeActiveLogin = useCallback(
    (status: boolean) => {
      if (!status && formRef.current.length === 2) {
        // 改为注册状态
        formRef.current.push({
          name: 'verification',
          prefixIcon: LinkOutline,
          field: 'verification',
          suffixComponent: Verification,
          components: Input,
          placeholder: '请输入验证码',
        });
        clearFormData();
      } else if (status && formRef.current.length > 2) {
        formRef.current = formRef.current.slice(0, -1);
        clearFormData();
      }
      setActiveLogin(() => status);
    },
    [clearFormData],
  );
  return (
    <>
      <Tab changeActive={changeActiveLogin} />
      <form>
        <List>
          {formRef.current.map((val) => {
            const { prefixIcon: Icon, components: Components, suffixComponent: SuffixComponents } = val;
            return (
              <ListItem key={val.name}>
                <Icon fontSize={24} />
                <Components
                  placeholder={val.placeholder || ''}
                  value={data[val.field]}
                  type={val.type || 'text'}
                  autoComplete={val.type === 'password' ? 'on' : null}
                  onChange={(value: string) => setFieldValue({ [val.field]: value })}
                />
                {SuffixComponents && <SuffixComponents width={100} height={50} text={validate} handleCanvasChange={handleCanvasChange} />}
              </ListItem>
            );
          })}
          <Button block color="primary" fill="solid">
            确定
          </Button>
        </List>
      </form>
    </>
  );
};

export default Login;
