import styled from 'styled-components';
import { Button } from '@/components/antd-mobile/index';
import { useCallback, useState } from 'react';
import { logout } from '@/api/user';
import { successTips } from '@/utils/message';
import { history } from 'umi';
const ButtonWrapper = styled.div`
  position: fixed;
  bottom: calc(4rem + 2rem + var(--sab));
  left: 50%;
  width: 85%;
  transform: translateX(-50%);
  border: none !important;
`;
const LogoutButton = () => {
  const [disabled, setDisabled] = useState(false);
  const handleLogout = useCallback(() => {
    setDisabled(true);
    let flag: boolean;
    logout()
      .then((res) => {
        successTips(res.message);
        flag = true;
        history.push('/login');
      })
      .finally(() => {
        !flag && setDisabled(false);
      });
  }, []);
  return (
    <ButtonWrapper>
      <Button block color="danger" fill="solid" loading={disabled} onClick={handleLogout}>
        退出登陆
      </Button>
    </ButtonWrapper>
  );
};

export default LogoutButton;
