import { useCallback, useRef } from 'react';
import styled from 'styled-components';
import * as qiniu from 'qiniu-js';
import type { Config } from 'qiniu-js/esm/upload';
import { getUploadToken } from '@/api';
const Button = styled.button`
  padding: 0.5rem 1rem;
  text-align: center;
  outline: none;
  border: none;
  color: #fff;
  border-radius: 0.4rem;
  background-color: #377df6;
`;
const UploadElement = styled.input`
  width: 0;
  height: 0;
  opacity: 0;
`;
interface uploadFileInstance {
  hash: string;
  key: string;
}
interface Props {
  children?: React.ReactNode;
  onSuccess?: (file: uploadFileInstance) => void;
}
interface putExtra {
  fname: string;
  mimeType: string;
}

export async function uploadFile(file: File, key: string, token: string, putExtra: putExtra, config: Config) {
  // 图片进行压缩
  const optGzip = {
    quality: 0.92,
    noCompressIfLarger: true,
  };
  const gzipInstance = await qiniu.compressImage(file, optGzip);
  const observable = qiniu.upload(gzipInstance.dist as File, key, token, putExtra, config);
  return function (nextCallback?: (...args: any[]) => void, subscriptionCallback?: (...args: any[]) => void) {
    return new Promise<uploadFileInstance>((resolve, reject) => {
      const observer = {
        next(res: { total: { loaded: number; percent: number; size: number } }) {
          nextCallback instanceof Function && nextCallback(res);
          console.log('percent', res.total.percent);
        },
        error(err: unknown) {
          console.log('err', err);
          reject(err);
        },
        complete(res: { hash: string; key: string }) {
          // ...
          console.log('complete', res);
          resolve(res);
        },
      };
      // subscription 可以取消上传的功能
      const subscription = observable.subscribe(observer); // 上传开始
      subscriptionCallback instanceof Function && subscriptionCallback(subscription);
    });
  };
}
const UploadButton: React.FC<Props> = ({ children, onSuccess }) => {
  const elementRef = useRef<HTMLInputElement>(null);

  const handleChange = useCallback(async () => {
    const el = elementRef.current;
    if (!el) return;
    if (el instanceof HTMLInputElement) {
      const list = el.files;
      if (list?.length && list.length > 0) {
        const data = list[0];
        const putExtra = {
          fname: data.name,
          mimeType: data.type,
        };
        const config = {
          useCdnDomain: true,
          // TODO: 后续配置
          region: qiniu.region.z2,
        };
        const { data: tokenInstance } = await getUploadToken();
        if (tokenInstance) {
          const { token } = tokenInstance;
          const callback = await uploadFile(data, data.name, token, putExtra, config);
          const result = await callback();
          console.log(result);
          onSuccess instanceof Function && onSuccess(result);
        }
      }
    }
  }, [onSuccess]);
  const clickInputElement = useCallback(() => {
    const el = elementRef.current;
    if (el) {
      el.click();
    }
  }, []);
  return (
    <>
      <UploadElement type="file" ref={elementRef} onChange={handleChange} />
      <Button onClick={clickInputElement}>{children}</Button>
    </>
  );
};

export default UploadButton;
