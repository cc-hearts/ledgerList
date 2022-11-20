import { UserInfoContext } from '@/views/Layout';
import { memo, useCallback, useContext, useEffect, useState } from 'react';
import { Input, Divider } from '@/components/antd-mobile/index';
import FixedButton from '@/feature/components/button';
import { updateUserInfo } from '../service';
import Avatar from '../avatar';
import styled from 'styled-components';
import { errorTips, successTips } from '@/utils/message';
import { noop } from '@/lib/shard';
import UploadButton from '@/components/upload/index';
import '@/assets/scss/avatar/index.scss';
interface updateUser {
  id: number;
  mobile: string;
  avatar: string;
  username: string;
}

const Wrapper = styled.div`
  padding: 4rem 2rem 0;
`;

const Description = styled.div`
  padding-left: 2rem;
`;

const ChangeUser = () => {
  const context = useContext(UserInfoContext) || { info: null, getInfo: noop };
  const { info, getInfo } = context;
  const [data, setData] = useState<updateUser | null>(null);
  useEffect(() => {
    if (info && data === null) {
      setData(() => ({ ...(info as unknown as updateUser) }));
    }
  }, [info, data]);
  const [load, setLoad] = useState(false);

  const handleChangeInput = useCallback(
    (e: string, field: string) => {
      if (data) {
        Reflect.set(data, field, e);
        setData(() => ({ ...data }));
      }
    },
    [data],
  );

  const handleSuccessFile = useCallback(
    (val) => {
      if (data) {
        const { hash, key } = val;
        const avatar = `${hash}/${encodeURI(key)}`;
        Reflect.set(data, 'avatar', avatar);
        setData({ ...data });
      }
    },
    [data],
  );

  const submit = useCallback(() => {
    // 保存
    console.log(data);
    if (data === null) return;
    const { mobile, avatar, id } = data;
    const updateData = {
      id,
    };
    if (avatar) {
      Reflect.set(updateData, 'avatar', avatar);
    }
    if (mobile) {
      Reflect.set(updateData, 'mobile', mobile);
    }
    if (!avatar && !mobile) {
      errorTips('请填写手机号码 或者更新头像');
      return;
    }
    setLoad(true);
    let flag: boolean;
    updateUserInfo(updateData)
      .then((res) => {
        flag = true;
        successTips(res.message);
        getInfo && getInfo();
        history.go(-1);
      })
      .finally(() => {
        !flag && setLoad(false);
      });
  }, [getInfo, data]);
  return (
    <>
      <Wrapper>
        <h2>手机号码</h2>
        <Input placeholder="请填写手机号码" value={data?.mobile || ''} onChange={(e) => handleChangeInput(e, 'mobile')} />
        <Divider />
        <h2>头像</h2>
        <div className="avatar">
          <Avatar sign={data?.username || ''} src={data?.avatar} />
          <Description>
            <div>支持 jpg png jpeg 格式大小200KB 以内的图片</div>
            <UploadButton onSuccess={handleSuccessFile}>点击上传</UploadButton>
          </Description>
        </div>
        <Divider />
      </Wrapper>
      <FixedButton text={'保存'} color="primary" onClick={submit} load={load} />
    </>
  );
};
export default memo(ChangeUser);
