import { UserInfoContext } from '@/main';
import { useContext } from 'react';
import Avatar from './avatar';
import '@/assets/scss/user/user.scss';
const User = () => {
  const context = useContext(UserInfoContext);
  if (context) {
    const { info } = context;
    return (
      <>
        {info ? (
          <div className="user__wrapper">
            <Avatar sign={(info.username as string) || ''} src={(info.avatar as string) || ''} />
            <div className="user__title">
              <div>
                <span>昵称：</span>
                <span>{info.username}</span>
              </div>
              <div className="user__sign">
                <span className="iconfont icon-mianxingyumaobi"></span>
                <span>{info.mobile || '暂无手机号号码'}</span>
              </div>
            </div>
          </div>
        ) : (
          ''
        )}
      </>
    );
  }
  return <></>;
};

export default User;
