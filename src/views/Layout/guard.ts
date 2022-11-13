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
  if (info === null) {
    getUserInfo()
      .then((res) => {
        setUserInfo(res.data!);
      })
      .catch((err) => {
        console.warn(err);
        clearUserInfo();
      });
  }

  return [info, clearUserInfo] as const;
}
