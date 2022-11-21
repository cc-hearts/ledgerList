import styled from 'styled-components';
import { UnlockOutline, UserContactOutline, LinkOutline } from 'antd-mobile-icons';
import { Input } from '@/components/antd-mobile/index';
import Verification from '@/components/verification/verification';
import { getVerification, changeVerification } from '../../../api/login';
import { useRef, useState, useCallback, useEffect, useImperativeHandle } from 'react';
interface Props {
  active: boolean;
  formRefs: any;
}
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
  field: string;
}
export interface loginForm {
  username: string;
  password: string;
  verification: string;
  [props: string]: unknown;
}
import type { SVGProps } from 'react';
import useFormData from '../../../hooks/login/useForm';
const LoginForm: React.FC<Props> = ({ active, formRefs }) => {
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
  const [validate, setValidate] = useState<string | null>(null);

  const handleCanvasChange = useCallback(() => {
    changeVerification().then((res) => {
      res.data && setValidate(res.data);
    });
  }, []);

  useImperativeHandle(
    formRefs,
    () => ({
      getData: () => {
        return data;
      },
      clearFormData,
    }),
    [data, clearFormData],
  );

  useEffect(() => {
    if (!active && formRef.current.length === 2) {
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
    } else if (active && formRef.current.length > 2) {
      formRef.current = formRef.current.slice(0, -1);
      clearFormData();
    }
  }, [active, clearFormData]);

  useEffect(() => {
    getVerification().then((res) => {
      res.data && setValidate(res.data);
    });
  }, []);
  return (
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
    </List>
  );
};
export default LoginForm;
