import { useCallback, useState } from 'react';
import { history } from 'umi';
import { getUserInfo } from '@/api/index';
export default function useUserInfo() {
  const [info, setUserInfo] = useState(null);
  const clearUserInfo = useCallback(() => {
    setUserInfo(null);
    localStorage.removeItem('token');
    history.push('/login');
  }, []);

  const getInfo = useCallback(() => {
    getUserInfo()
      .then((res) => {
        setUserInfo(res.data!);
      })
      .catch((err) => {
        console.warn(err);
        clearUserInfo();
      });
  }, [clearUserInfo]);
  if (info === null && localStorage.getItem('token') !== null) {
    getInfo();
  }
  return [info, clearUserInfo, getInfo] as const;
}
