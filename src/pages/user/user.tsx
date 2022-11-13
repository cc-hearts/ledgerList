import { UserInfoContext } from '@/views/Layout';
import { useContext } from 'react';
import styled from 'styled-components';
const UserWrapper = styled.div`
  padding: 2rem 3rem;
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
const User = () => {
  const context = useContext(UserInfoContext);
  if (context) {
    const { info } = context;
    return (
      <>
        {info ? (
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
        ) : (
          ''
        )}
      </>
    );
  }
  return <></>;
};

export default User;
