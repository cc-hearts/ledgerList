import { noop } from '@/lib/shard';
import styled from 'styled-components';

const Input = styled.input`
  padding: 0.5rem 0.75rem;
  width: 100%;
  border-radius: 0.3rem;
  border: 1px solid var(--primary-border-color, #1677ff);
  &::placeholder {
    opacity: 0.6;
  }
`;
export default ({ placeholder = '', click = noop, readonly = false, value = '', ...args }) => {
  return <Input placeholder={placeholder} onClick={click} value={value} readOnly={readonly} {...args}></Input>;
};
