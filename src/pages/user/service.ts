import { Post } from '@/utils/request';

export function logout() {
  return Post('api/login/logout');
}
