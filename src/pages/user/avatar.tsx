import React, { memo, useEffect, useState } from 'react';
import styled from 'styled-components';
import { getImagePreviewPath } from '@/utils/oss';

const AvatarComponent = styled.div`
  width: 4rem;
  height: 4rem;
  color: #fff;
  padding: 0;

  img {
    width: 100%;
  }

  span {
    display: flex;
    height: 100%;
    text-transform: uppercase;
    font-size: 2rem;
    justify-content: center;
    align-items: center;
    background-color: #617ee0;
  }
`;
interface Props {
  src?: string;
  sign: string;
}
const Avatar: React.FC<Props> = ({ src, sign }) => {
  const [avatarSrc, setAvatarSrc] = useState<string>('');
  useEffect(() => {
    if (src) {
      const key = src.split('/')[1];
      getImagePreviewPath(decodeURI(key)).then((path) => {
        if (path) {
          setAvatarSrc(path);
        }
      });
    }
  }, [src]);

  if (!sign) return <></>;
  const avatar = avatarSrc ? null : sign.slice(0, 1);
  return <AvatarComponent>{avatarSrc ? <img src={avatarSrc} alt="avatar" /> : <span>{avatar}</span>}</AvatarComponent>;
};

export default memo(Avatar);
