import { history, useLocation } from 'umi';
export function useGuard() {
  const location = useLocation();
  const { pathname } = location;
  const token = localStorage.getItem('token');
  if (!token && pathname !== '/login') {
    history.push('/login');
  }
}
