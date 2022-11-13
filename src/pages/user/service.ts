import { Post } from '@/utils/request';

export function logout() {
  return Post('api/login/logout');
}

export function updateUserInfo<T extends params>(params: T) {
  return Post('api/user/updateUserInfo', params);
}
