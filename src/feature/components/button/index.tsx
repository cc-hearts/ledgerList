import styled from 'styled-components';
import { Button } from '@/components/antd-mobile/index';
const ButtonWrapper = styled.div`
  position: fixed;
  bottom: calc(4rem + 2rem + var(--sab));
  left: 50%;
  width: 85%;
  transform: translateX(-50%);
  border: none !important;
`;
interface Props {
  color?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
  text: string;
  load: boolean;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
const FixedButton: React.FC<Props> = ({ color = 'default', text, onClick, load }) => {
  return (
    <ButtonWrapper>
      <Button block color={color} fill="solid" loading={load} onClick={onClick}>
        {text}
      </Button>
    </ButtonWrapper>
  );
};
export default FixedButton;
