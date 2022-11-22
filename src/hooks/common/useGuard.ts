import { history, useLocation } from 'umi';

export default function useGuard() {
  const location = useLocation();
  const { pathname } = location;
  const token = localStorage.getItem('token');
  if (!token && pathname !== '/login') {
    history.push('/login');
  }
  if (token && pathname === '/') {
    history.push('/main/task');
  }
}
