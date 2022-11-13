import { useCallback, useState } from 'react';
import { history, useLocation } from 'umi';
import { getUserInfo } from './service';
export function useGuard() {
  const location = useLocation();
  const { pathname } = location;
  const token = localStorage.getItem('token');
  if (!token && pathname !== '/login') {
    history.push('/login');
  }
}

export function useUserInfo() {
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
  if (info === null) {
    getInfo();
  }
  return [info, clearUserInfo, getInfo] as const;
}
