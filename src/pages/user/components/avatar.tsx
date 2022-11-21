import React, { memo, useEffect, useState } from 'react';
import { getImagePreviewPath } from '@/utils/oss';

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
  return <div className="avatar__img">{avatarSrc ? <img src={avatarSrc} alt="avatar" /> : <span>{avatar}</span>}</div>;
};

export default memo(Avatar);
