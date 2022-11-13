import { UserInfoContext } from '@/views/Layout';
import { useContext } from 'react';
import Avatar from './avatar';
import styled from 'styled-components';
const UserWrapper = styled.div`
  padding: 2rem 1rem;
  color: #fff;
  & > div {
    &:first-child {
      display: inline-block;
      padding: 0.2rem 0.5rem;
      background-color: #617ee0;
      border-radius: 5px;
    }
  }
`;
const Sign = styled.div`
  display: flex;
  align-items: center;
  span:first-child {
    font-size: 1.5rem;
    margin-right: 0.5rem;
  }
`;
const Wrapper = styled.div`
  display: flex;
  padding: 0 2rem;
  align-items: center;
`;
const User = () => {
  const context = useContext(UserInfoContext);
  if (context) {
    const { info } = context;
    return (
      <>
        {info ? (
          <Wrapper>
            <Avatar sign={(info.username as string) || ''} src={(info.src as string) || ''} />
            <UserWrapper>
              <div>
                <span>昵称：</span>
                <span>{info.username}</span>
              </div>
              <Sign>
                <span className="iconfont icon-mianxingyumaobi"></span>
                <span>{info.mobile || '暂无手机号号码'}</span>
              </Sign>
            </UserWrapper>
          </Wrapper>
        ) : (
          ''
        )}
      </>
    );
  }
  return <></>;
};

export default User;
